import { Message } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";
import { sqsAwsClient } from "../lib/aws/sqs/client";
import Logger from "../lib/Logger/Logger";
import { PrismaEmailVerificationCodeRepository } from "../repositories/prisma/prisma.email-verification-code.repository";
import { PrismaUserRepository } from "../repositories/prisma/prisma.user.repository";
import { EmailVerificationService } from "../services/auth/email-validator/email-verification.service";
import { NodemailerEmailService } from "../services/email/email.service";
import { User } from "@prisma/client";

const queueUrl = process.env.SEND_VERIFICATION_EMAIL_QUEUE as string;

const handleMessage = async function (message: Message): Promise<void> {
  try {
    if (!message.Body) {
      Logger.critical("Message without body", { message });
      return;
    }

    const messageBody = JSON.parse(message.Body);
    const formattedMessage = JSON.parse(messageBody.Message);

    const emailService = new EmailVerificationService(
      new PrismaEmailVerificationCodeRepository(),
      new NodemailerEmailService(),
      new PrismaUserRepository()
    );

    if (!formattedMessage.user) {
      Logger.critical("Message without user", { message });
      return;
    }

    const user = formattedMessage.user as User;

    await emailService.sendVerificationEmail(user, "http://localhost/");
  } catch (e) {
    Logger.critical("Consumer failed ", { e });
    return;
  }
};

export const verificationEmailConsumer = Consumer.create({
  queueUrl: queueUrl,
  attributeNames: ["All"],
  handleMessage: handleMessage,
  sqs: sqsAwsClient,
});
