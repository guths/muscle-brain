import { User } from "@prisma/client";
import { CreateUserData, UserRepository } from "../user.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserData): Promise<User> {
    return await prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      },
    });
  }

  async findUnique(whereFields: object): Promise<User | null> {
    return await prisma.user.findUnique({
      where: whereFields,
    });
  }

  async update(whereFields: object, data: object): Promise<User> {
    return await prisma.user.update({
      where: whereFields,
      data: data,
    });
  }
}
