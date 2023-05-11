import { removeSpecialCharacters } from "../../lib/Helper/string.helper";
import prisma from "../../lib/Prisma/Prisma";
import {
  ShelfRepository,
  UpdateShelfData,
} from "../../repositories/shelf.repository";
import { UserRepository } from "../../repositories/user.repository";

export class ShelfService {
  constructor(
    private shelfRepository: ShelfRepository,
    private userRepository: UserRepository
  ) {}

  public async createShelf(name: string, userId: number) {
    const user = await this.userRepository.findUnique({
      id: userId,
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    const corretedName = removeSpecialCharacters(name);

    const shelfExist = await this.shelfRepository.findFirst({
      name: corretedName,
      user_id: user.id,
    });

    if (shelfExist) {
      throw new Error("Shelf already exist");
    }

    const shelf = await this.shelfRepository.create({
      name: corretedName,
      user_id: user.id,
    });

    return shelf;
  }

  public async updateShelf(updatedShelfData: UpdateShelfData) {
    const existShelf = this.shelfRepository.findUnique({
      id: updatedShelfData.id,
    });

    if (!existShelf) {
      throw new Error("Shelf does not exist.");
    }

    const correctedName = removeSpecialCharacters(updatedShelfData.name);

    const existShelfSameName = await this.shelfRepository.findFirst({
      name: correctedName,
      user_id: updatedShelfData.user_id,
    });

    if (existShelfSameName) {
      throw new Error("This name is already been used by other shelf.");
    }

    const updatedShelf = this.shelfRepository.update(
      {
        id: updatedShelfData.id,
      },
      {
        name: correctedName,
      }
    );

    return updatedShelf;
  }

  public async deleteShelf(shelfId: number) {
    const deleteShelf = await this.shelfRepository.delete({
      id: shelfId
    });

    return deleteShelf;
  }
}
