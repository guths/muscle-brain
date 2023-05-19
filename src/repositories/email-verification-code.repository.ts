import { EmailVerificationCode } from "@prisma/client";

export interface CreateEmailVerificationCode {
  code: string;
  user_id: number;
  verified_at?: Date;
}

export interface EmailVerificationCodeRepository {
  create(data: CreateEmailVerificationCode): Promise<EmailVerificationCode>;
  findUnique(whereFields: object): Promise<EmailVerificationCode | null>;
  update(whereFields: object, data: object): Promise<EmailVerificationCode>
}
