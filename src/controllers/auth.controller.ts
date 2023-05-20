import { NextFunction, Request, Response } from "express";
import { RegisterDto } from "../dto/register.dto";
import { RegisterService } from "../services/auth/register/register.service";
import ResponseHelper from "../lib/HttpResponse/ResponseHelper";
import { PrismaUserRepository } from "../repositories/prisma/prisma.user.repository";
import { validateRequest } from "../validators/validator";
import { LoginDto } from "../dto/login.dto";
import LoginService from "../services/auth/login/login.service";
import { PrismaShelfRepository } from "../repositories/prisma/prisma.shelf.repository";
import { EmailVerificationService } from "../services/auth/email-validator/email-verification.service";
import { PrismaEmailVerificationCodeRepository } from "../repositories/prisma/prisma.email-verification-code.repository";
import { NodemailerEmailService } from "../services/email/email.service";
class AuthController {
  public async register(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const registerRequest = {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      nickname: request.body.nickname,
      email: request.body.email,
      password: request.body.password,
    } as RegisterDto;

    const registerService = new RegisterService(
      new PrismaUserRepository(),
      new PrismaShelfRepository()
    );

    try {
      const user = await registerService.register(registerRequest);
      return ResponseHelper.created(response, user);
    } catch (e) {
      return next(e);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    const loginRequest = {
      email: request.body.email,
      password: request.body.password,
    } as LoginDto;

    const loginService = new LoginService(new PrismaUserRepository());

    try {
      const user = await loginService.login(
        loginRequest.email,
        loginRequest.password
      );

      return ResponseHelper.ok(response, user);
    } catch (e) {
      next(e);
    }
  }

  public async verifyEmail(
    request: any,
    response: Response,
    next: NextFunction
  ) {
    const emailVerificationService = new EmailVerificationService(
      new PrismaEmailVerificationCodeRepository(),
      new NodemailerEmailService(),
      new PrismaUserRepository
    );

    const code = request.params.code as string;
    const userId = request.user.user_id;

    try {
      const res = await emailVerificationService.verifyEmailCode(code, userId);

      return ResponseHelper.ok(response, res);
    } catch (e) {
      next(e);
    }
    
  }
}

const authController = new AuthController();

export { authController };
