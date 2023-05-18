import {
  EmailService,
  EmailTransporterInterface,
  SendEmailInterface,
} from "./email.interface";
import nodemailer from "nodemailer";

class NodemailerEmailService implements EmailService {
  public async sendEmail(
    sendEmailData: SendEmailInterface,
    emailTransporter: EmailTransporterInterface
  ) {
    if (process.env.APP_ENV === "local") {
      emailTransporter = await this.getTestAccountTransporterData();
    }

    const transporter = nodemailer.createTransport(emailTransporter);

    const info = await transporter.sendMail(sendEmailData);

    return info;
  }

  private async getTestAccountTransporterData() {
    let testAccount = await nodemailer.createTestAccount();

    return {
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    };
  }
}
