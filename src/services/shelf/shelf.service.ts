import { removeSpecialCharacters } from "../../lib/Helper/string.helper";
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

    const shelfExist = await this.shelfRepository.findUnique({
      user_id: user.id,
      name: name,
    });

    if (shelfExist) {
      throw new Error("Shelf already exist");
    }

    const shelf = await this.shelfRepository.create({
      name: name,
      user_id: user.id,
    });

    return shelf;
  }
}
