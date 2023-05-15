import { Author } from "@prisma/client";
import { CreateAuthorData, AuthorRepository } from "../author.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaAuthorRepository implements AuthorRepository {
  create(createAuthorData: CreateAuthorData): Promise<Author> {
    return prisma.author.create({
      data: createAuthorData,
    });
  }
  findUnique(whereFields: object): Promise<Author | null> {
    return prisma.author.findUnique({
      where: whereFields,
    });
  }

  findFirst(whereFields: object): Promise<Author | null> {
    return prisma.author.findFirst({
      where: whereFields,
    });
  }
}
