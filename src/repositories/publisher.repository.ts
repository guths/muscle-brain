import { Publisher } from "@prisma/client";

export interface CreatePublisherData {
    name: string;
}

export interface PublisherRepository {
    create(createPublisherData: CreatePublisherData): Promise<Publisher>
    findUnique(whereFields: object): Promise<Publisher | null>
}