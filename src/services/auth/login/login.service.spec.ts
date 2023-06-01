import { PrismaClient, User } from "@prisma/client";
import { prismaMock } from "../../../lib/Prisma/prisma.mock";
import LoginService from "./login.service";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma.user.repository";
import bcrypt from "bcryptjs";

afterAll(async () => {
  const prisma = new PrismaClient({
    datasources: {
      db: { url: "postgresql://prisma:prisma@localhost:5433/tests" },
    },
  });

  await prisma.author.deleteMany();

  let users = await prisma.author.findMany();

  console.log(users);
});


describe("Login Service Test", () => {
  const PASSWORD_SALT = 10;
  let user: User;

  beforeAll(async () => {
    process.env.API_TOKEN_KEY = "rockandstone";
  });

  it("should throw user not found error", async () => {
    const user = {
      id: 1,
      first_name: "Jonathan",
      last_name: "Guths",
      nickname: "jguths",
      email: "jonathanguths@gmail.com",
      password: "rockandstone",
    };

    prismaMock.user.findUnique.mockResolvedValue(null);

    const userRepository = new PrismaUserRepository();

    const loginService = new LoginService(userRepository);

    expect(
      async () => await loginService.login(user.email, user.password)
    ).rejects.toThrow(Error("User not found"));
  });

  it("should throw passwords doest not match", () => {
    const user = {
      id: 1,
      first_name: "Jonathan",
      last_name: "Guths",
      nickname: "jguths",
      email: "jonathanguths@gmail.com",
      password: "rockandstone",
    };

    prismaMock.user.findUnique.mockResolvedValue(user as User);

    const userRepository = new PrismaUserRepository();

    const loginService = new LoginService(userRepository);

    expect(
      async () => await loginService.login(user.email, "RockAndStone")
    ).rejects.toThrow(Error("Password does not match"));
  });

  it("should return token and user without any error", async () => {
    let password = "rockandstone";

    const user = {
      id: 1,
      first_name: "Jonathan",
      last_name: "Guths",
      nickname: "jguths",
      email: "jonathanguths@gmail.com",
      password: "rockandstone",
    };

    const encryptedPassword = await bcrypt.hash(password, PASSWORD_SALT);

    user.password = encryptedPassword;

    prismaMock.user.findUnique.mockResolvedValue(user as User);

    const userRepository = new PrismaUserRepository();

    const loginService = new LoginService(userRepository);

    const loginResponse = await loginService.login(user.email, password);

    expect(loginResponse).toHaveProperty("token");
  });

  test("get right .env", async () => {
    const prisma = new PrismaClient({
      datasources: {
        db: { url: "postgresql://prisma:prisma@localhost:5433/tests" },
      },
    });
  });
});
