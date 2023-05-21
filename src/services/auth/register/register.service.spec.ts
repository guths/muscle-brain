import { User } from "@prisma/client";
import { prismaMock } from "../../../lib/Prisma/prisma.mock";
import { RegisterService } from "./register.service";
import { RegisterDto } from "../../../dto/register.dto";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma.user.repository";
import { PrismaShelfRepository } from "../../../repositories/prisma/prisma.shelf.repository";
import { EmailVerificationService } from "../email-validator/email-verification.service";

describe("Register Service Test", () => {
  beforeAll(() => {
    process.env.API_TOKEN_KEY = "rockandstone";
  });

  it("should create new user", async () => {
    const user = {
      id: 1,
      first_name: "Jonathan",
      last_name: "Guths",
      nickname: "jguths",
      email: "jonathanguths@gmail.com",
      password: "rockandstone",
    };

    const registerRequest = { ...user };

    prismaMock.user.create.mockResolvedValue(user as User);

    EmailVerificationService.prototype.generateEmailVerificationCode = jest.fn().mockReturnValue(true);
    EmailVerificationService.prototype.sendVerificationEmail = jest.fn().mockReturnValue(true);

    const registerService = new RegisterService(
      new PrismaUserRepository(),
      new PrismaShelfRepository()
    );

    const createdUser = await registerService.register(
      registerRequest as unknown as RegisterDto
    );

    expect(createdUser).toHaveProperty("id");
    expect(createdUser).toHaveProperty("first_name");
    expect(createdUser).toHaveProperty("last_name");
    expect(createdUser).toHaveProperty("nickname");
    expect(createdUser).toHaveProperty("email");
  });

  it("should throw user already exists", async () => {
    const user = {
      id: 1,
      first_name: "Jonathan",
      last_name: "Guths",
      nickname: "jguths",
      email: "jonathanguths@gmail.com",
      password: "rockandstone",
    };

    const registerRequest = { ...user };

    prismaMock.user.findUnique.mockResolvedValue(user as User);

    const registerService = new RegisterService(
      new PrismaUserRepository(),
      new PrismaShelfRepository()
    );

    expect(
      async () =>
        await registerService.register(
          registerRequest as unknown as RegisterDto
        )
    ).rejects.toThrow(Error("User already exists"));
  });
});
