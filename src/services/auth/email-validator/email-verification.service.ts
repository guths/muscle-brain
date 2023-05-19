import { v4 as uuid } from "uuid";
import { CreateEmailVerificationCode } from "../../../repositories/email-verification-code.repository";
import { EmailVerificationCodeRepository } from "../../../repositories/email-verification-code.repository";
import { Forbidden, NotFound } from "../../../lib/Errors/errors";
import handlebars from "handlebars";
import {
  EmailService,
  EmailTransporterInterface,
  SendEmailInterface,
} from "../../email/email.interface";
import { readFileSync } from "fs";
import { User } from "@prisma/client";

export class EmailVerificationService {
  constructor(
    private emailVerificationCodeRepository: EmailVerificationCodeRepository,
    private emailService: EmailService
  ) {}

  public async generateEmailVerificationCode(userId: number) {
    const newCode = uuid();

    const createGenerateEmailVerificationCode = {
      user_id: userId,
      code: newCode,
    } as CreateEmailVerificationCode;

    return await this.emailVerificationCodeRepository.create(
      createGenerateEmailVerificationCode
    );
  }

  private async buildEmailVerificationCodeUrl(
    code: string,
    url: string
  ): Promise<string> {
    return `${url}/api/v1/verify-email/${code}`;
  }

  public async sendVerificationEmail(user: User, appUrl: string) {
    const verificationCodeEntity =
      await this.emailVerificationCodeRepository.findUnique({
        user_id: user.id,
      });

    if (!verificationCodeEntity) {
      throw new NotFound("Vertification Email code not found");
    }

    const html = readFileSync(
      require.resolve("../../email/templates/email-verification.hbs"),
      "utf-8"
    );

    const templateSource = handlebars.compile(html);

    const data = {
      name: user.first_name,
      verificationLink: this.buildEmailVerificationCodeUrl(
        verificationCodeEntity.code,
        "https://www.bookxd.club/verify-email"
      ),
    };

    const sendEmailData = {
      from: process.env.EMAIL_FROM as string,
      to: user.email,
      subject: "Activate your E-mail - Bookxd.club",
      html: templateSource(data),
    } as SendEmailInterface;

    const emailTransporter = {
      host: process.env.EMAIL_HOST as unknown as string,
      port: process.env.EMAIL_PORT as unknown as number,
      secure: false,
      auth: {
        user: process.env.EMAIL_AUTH_USER as string,
        pass: process.env.EMAIL_AUTH_PASSWORD as string,
      },
    } as EmailTransporterInterface;

    return await this.emailService.sendEmail(sendEmailData, emailTransporter);
  }

  public async verifyEmailCode(code: string, userId: number) {
    const verificationCodeEntity =
      await this.emailVerificationCodeRepository.findUnique({
        code: code,
      });

    if (!verificationCodeEntity) {
      throw new NotFound("Code does not exist");
    }

    if (verificationCodeEntity.user_id !== userId) {
      throw new Forbidden("User is trying to verify other user code");
    }

    return await this.emailVerificationCodeRepository.update(
      {
        code: code,
      },
      {
        verifiedAt: new Date(),
      }
    );
  }
}
