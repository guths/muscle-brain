import { Forbidden, NotFound } from "../../lib/Errors/errors";
import { removeSpecialCharacters } from "../../lib/Helper/string.helper";
import prisma from "../../lib/Prisma/Prisma";
import {
  ShelfRepository,
  UpdateShelfData,
} from "../../repositories/shelf.repository";
import { UserRepository } from "../../repositories/user.repository";

export class ShelfService {
  DEFAULT_SHELF_NAMES = ["Read", "Reading", "Want to read"];

  constructor(
    private shelfRepository: ShelfRepository,
    private userRepository: UserRepository
  ) {}

  public async createShelf(name: string, userId: number) {
    const corretedName = removeSpecialCharacters(name);

    const shelfExist = await this.shelfRepository.findFirst({
      name: corretedName,
      user_id: userId,
    });

    if (shelfExist) {
      throw new Error("Shelf already exist");
    }

    const shelf = await this.shelfRepository.create({
      name: corretedName,
      user_id: userId,
      is_default: false,
    });

    return shelf;
  }

  public async updateShelf(updatedShelfData: UpdateShelfData) {
    const existShelf = await this.shelfRepository.findUnique({
      id: updatedShelfData.id,
    });

    if (!existShelf) {
      throw new Error("Shelf does not exist.");
    }

    if (existShelf.user_id !== updatedShelfData.user_id) {
      throw new Forbidden("User is trying to update other user shelf");
    }

    if (updatedShelfData.name) {
      const correctedName = removeSpecialCharacters(updatedShelfData.name);

      const existShelfSameName = await this.shelfRepository.findFirst({
        name: correctedName,
        user_id: updatedShelfData.user_id,
      });

      if (existShelfSameName) {
        throw new Error("This name is already been used by other shelf.");
      }

      updatedShelfData.name = correctedName;
    }

    const updatedShelf = this.shelfRepository.update(
      {
        id: updatedShelfData.id,
      },
      updatedShelfData
    );

    return updatedShelf;
  }

  public async deleteShelf(shelfId: number) {
    const deleteShelf = await this.shelfRepository.delete({
      id: shelfId,
    });

    return deleteShelf;
  }

  public async createDefaultShelvesForUser(userId: number): Promise<void> {
    try {
      for (const shelfName of this.DEFAULT_SHELF_NAMES) {
        const shelf = await this.shelfRepository.create({
          name: shelfName,
          user_id: userId,
          is_default: true,
        });

        console.log(shelf);
      }
    } catch (e) {
      throw new Error(
        `Error while creating default shelves for User ID = ${userId}`
      );
    }
  }

  public async findShelfById(shelfId: number) {
    const shelf = await this.shelfRepository.findUnique({
      id: shelfId,
    });

    if (!shelf) {
      throw new NotFound("Shelf not found");
    }

    return shelf;
  }
}
