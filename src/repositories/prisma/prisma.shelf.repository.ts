import { Shelf } from "@prisma/client";
import { CreateShelfData, ShelfRepository} from "../shelf.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaShelfRepository implements ShelfRepository {
  update(whereFields: object, data: object): Promise<Shelf> {
    return prisma.shelf.update({
      where: whereFields,
      data: data
    })
  }
  create(data: CreateShelfData): Promise<Shelf> {
    return prisma.shelf.create({
      data: {
        name: data.name,
        user_id: data.user_id
      }
    })
  }

  findUnique(whereFields: object): Promise<Shelf | null> {
    return prisma.shelf.findUnique({
      where: whereFields
    })
  }

  findFirst(whereFields: object): Promise<Shelf | null> {
    return prisma.shelf.findFirst({
      where: whereFields
    })
  }

  
  
}