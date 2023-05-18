export interface EmailTransporterInterface {
  host: string,
  port: number,
  secure: boolean,
  auth: {
    user: string,
    pass: string
  }
}

export interface SendEmailInterface {
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string
}


export interface EmailService {
  sendEmail(sendEmailData: SendEmailInterface, emailTransporter: EmailTransporter)
}