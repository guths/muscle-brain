import { Genre } from "@prisma/client";
import { CreateGenreData, GenreRepository } from "../genre.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaGenreRepository implements GenreRepository {
    create(createGenreData: CreateGenreData): Promise<Genre> {
        return prisma.genre.create({
            data: createGenreData
        })
    }
    findUnique(whereFields: object): Promise<Genre | null> {
        return prisma.genre.findUnique({
            where: whereFields
        })
    }

}