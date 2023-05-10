import { User } from "@prisma/client";

export interface CreateUserData {
    first_name: string;
    last_name: string;
    nickname: string;
    email: string;
    password: string;
}

export interface UserRepository {
    create(data: CreateUserData): Promise<User>
    findUnique(whereFields: object): Promise<User|null>
}