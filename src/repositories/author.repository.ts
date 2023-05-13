import { Author } from "@prisma/client";

export interface CreateAuthorData {
    name: string;
}

export interface AuthorRepository {
    create(createAuthorData: CreateAuthorData): Promise<Author>
    findUnique(whereFields: object): Promise<Author | null>
}