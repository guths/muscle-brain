import exp from "constants";
import prisma from "../../lib/Prisma/Prisma";
import { PrismaShelfRepository } from "../../repositories/prisma/prisma.shelf.repository";
import { PrismaUserRepository } from "../../repositories/prisma/prisma.user.repository";
import { ShelfService } from "./shelf.service";
import { Forbidden, NotFound } from "../../lib/Errors/errors";

describe("Shelf Service Tests", () => {
  const userDto = {
    first_name: "rock",
    last_name: "stone",
    nickname: "dwarf",
    email: "rockandstone@ras.com",
    password: "stoneandrock",
  };

  const shelfService = new ShelfService(
    new PrismaShelfRepository(),
    new PrismaUserRepository()
  );

  beforeEach(async () => {
    await prisma.shelf.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should create a shelf", async () => {
    const user = await prisma.user.create({
      data: userDto,
    });

    const shelf = await shelfService.createShelf(
      "Shelf Integration Test",
      user.id
    );

    expect(shelf).toHaveProperty("id");
  });

  it("should create a shelf without special characters (only underscore)", async () => {
    const user = await prisma.user.create({
      data: userDto,
    });

    const nameWithSpecialChar = "Test_#$*()%%^^^^^";
    const nameWithoutSpecialChar = "Test_";

    const shelf = await shelfService.createShelf(nameWithSpecialChar, user.id);

    expect(shelf).toHaveProperty("id");
    expect(shelf).toHaveProperty("name");
    expect(shelf.name).toBe(nameWithoutSpecialChar);
  });

  it("should throw error when shelf already exists", async () => {
    const user = await prisma.user.create({
      data: userDto,
    });

    const shelfName = "Test";

    await shelfService.createShelf(shelfName, user.id);

    expect(
      async () => await shelfService.createShelf(shelfName, user.id)
    ).rejects.toThrow(Error("Shelf already exist"));
  });

  it("should update a shelf", async () => {
    const user = await prisma.user.create({
      data: userDto,
    });

    const createdShelf = await shelfService.createShelf("test 1", user.id);

    const updatedShelfDto = {
      id: createdShelf.id,
      name: "test 2",
      user_id: user.id,
      is_default: false,
    };

    const updatedShelf = await shelfService.updateShelf(updatedShelfDto);

    expect(updatedShelf.id).toBe(updatedShelf.id);
    expect(updatedShelf.name).toBe(updatedShelf.name);
  });

  it("should not update a shelf that not exist", async () => {
    const user = await prisma.user.create({
      data: userDto,
    });

    const updatedShelfDto = {
      id: 100,
      name: "test 2",
      user_id: user.id,
      is_default: false,
    };

    expect(
      async () => await shelfService.updateShelf(updatedShelfDto)
    ).rejects.toThrow(new Error("Shelf does not exist."));
  });

  it("should not update a other user shelf", async () => {
    const user = await prisma.user.create({
      data: userDto,
    });

    const createdShelf = await shelfService.createShelf("test 1", user.id);

    const updatedShelfDto = {
      id: createdShelf.id,
      name: "test 2",
      user_id: 100,
      is_default: false,
    };

    expect(
      async () => await shelfService.updateShelf(updatedShelfDto)
    ).rejects.toThrow(
      new Forbidden("User is trying to update other user shelf")
    );
  });

  it("should get shelf by id", async () => {
    const user = await prisma.user.create({
      data: userDto,
    });

    const createdShelf = await shelfService.createShelf("test 1", user.id);

    const foundShelf = await shelfService.findShelfById(createdShelf.id);

    expect(foundShelf).toHaveProperty("id");
  });

  it("should throw not found error when find by non existed id", async () => {
    expect(async () => await shelfService.findShelfById(100)).rejects.toThrow(new NotFound("Shelf not found"));
  })
});
