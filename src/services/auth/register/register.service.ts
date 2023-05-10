import { PrismaClient, User } from "@prisma/client";
import { RegisterDto } from "../../../dto/register.dto";
import bcrypt from "bcryptjs";
import { JwtService } from "../token/jwt.service";
import prisma from "../../../lib/Prisma/Prisma";
import { UserRepository } from "../../../repositories/user.repository";

const PASSWORD_SALT = 10;

export class RegisterService {
  constructor(private userRepository: UserRepository) {}

  public async register(registerRequest: RegisterDto): Promise<Object> {
    const oldUser = await prisma.user.findUnique({
      where: {
        email: registerRequest.email,
      },
    });

    if (oldUser) {
      throw new Error("User already exists");
    }

    const nicknameCheck = await prisma.user.findUnique({
      where: {
        nickname: registerRequest.nickname,
      },
    })

    if(nicknameCheck) {
      throw new Error("Nickname already been taken")
    }

    const encryptedPassword = await bcrypt.hash(
      registerRequest.password,
      PASSWORD_SALT
    );

    const user = await this.userRepository.create({
      first_name: registerRequest.first_name,
      last_name: registerRequest.last_name,
      nickname: registerRequest.nickname,
      email: registerRequest.email,
      password: encryptedPassword,
    });

    const jwtService = new JwtService();

    const token = jwtService.sign(user.id, user.email, "24h");

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      nickname: user.nickname,
      email: user.email,
      token: token
    }
  }
}
