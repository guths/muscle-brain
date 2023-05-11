import { removeSpecialCharacters } from "../../lib/Helper/string.helper";
import prisma from "../../lib/Prisma/Prisma";
import { ShelfRepository } from "../../repositories/shelf.repository";
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
      throw new Error("User not exist");
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

    console.log(shelf);

    return shelf;
  }
}
