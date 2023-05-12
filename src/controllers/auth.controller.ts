import { NextFunction, Request, Response } from "express";
import { RegisterDto } from "../dto/register.dto";
import { RegisterService } from "../services/auth/register/register.service";
import ResponseHelper from "../lib/HttpResponse/ResponseHelper";
import { PrismaUserRepository } from "../repositories/prisma/prisma.user.repository";
import { validateRequest } from "../validators/validator";
import { LoginDto } from "../dto/login.dto";
import LoginService from "../services/auth/login/login.service";
import { PrismaShelfRepository } from "../repositories/prisma/prisma.shelf.repository";
class AuthController {
  public async register(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    validateRequest(request, response);

    const registerRequest = {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      nickname: request.body.nickname,
      email: request.body.email,
      password: request.body.password,
    } as RegisterDto;

    const registerService = new RegisterService(new PrismaUserRepository(), new PrismaShelfRepository());

    try {
      const user = await registerService.register(registerRequest);
    return ResponseHelper.created(response, user);
    } catch (e) {
      return next(e);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    validateRequest(request, response);

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
}

const authController = new AuthController();

export { authController };
