import { v4 as uuid } from "uuid";
import { CreateEmailVerificationCode } from "../../../repositories/email-verification-code.repository";
import { EmailVerificationCodeRepository } from "../../../repositories/email-verification-code.repository";
import { NotFound } from "../../../lib/Errors/errors";
import {
  EmailService,
  EmailTransporterInterface,
  SendEmailInterface,
} from "../../email/email.interface";

class EmailVerificationService {
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
    userId: number,
    url: string
  ): Promise<string> {
    const verificationEntity =
      await this.emailVerificationCodeRepository.findUnique({
        userId: userId,
      });

    const code = verificationEntity?.code;

    return `${url}/api/v1/verify-email/${code}`;
  }

  public async sendVerificationEmail(
    userId: number,
    userEmail: string,
    appUrl: string
  ) {
    const code = this.emailVerificationCodeRepository.findUnique({
      userId: userId,
    });

    if (!code) {
      throw new NotFound("Vertification Email code not found");
    }

    const sendEmailData = {
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: "Activate your E-mail - Bookxd.club",
      text: `Click here to activate your e-mail ${this.buildEmailVerificationCodeUrl(
        userId,
        appUrl
      )}`,
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

    const response = await this.emailService.sendEmail(
      sendEmailData,
      emailTransporter
    );

    console.log(response);
  }
}
