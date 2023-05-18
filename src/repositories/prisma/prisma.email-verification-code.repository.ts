import { EmailVerificationCode } from "@prisma/client";
import {
  CreateEmailVerificationCode,
  EmailVerificationCodeRepository,
} from "../email-verification-code.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaEmailVerificationCodeRepository
  implements EmailVerificationCodeRepository
{
  create(data: CreateEmailVerificationCode): Promise<EmailVerificationCode> {
    return prisma.emailVerificationCode.create({
      data: data,
    });
  }
  findUnique(whereFields: object): Promise<EmailVerificationCode | null> {
    return prisma.emailVerificationCode.findUnique({
      where: whereFields,
    });
  }
}
