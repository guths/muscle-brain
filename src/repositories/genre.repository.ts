import { Genre } from "@prisma/client";

export interface CreateGenreData {
    name: string;
}

export interface GenreRepository {
    create(createGenreData: CreateGenreData): Promise<Genre>
    findUnique(whereFields: object): Promise<Genre | null>
}