import { Publisher } from "@prisma/client";
import { CreatePublisherData, PublisherRepository } from "../publisher.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaPublisherRepository implements PublisherRepository {
    create(createPublisherData: CreatePublisherData): Promise<Publisher> {
        return prisma.publisher.create({
            data: createPublisherData
        })
    }
    
    findUnique(whereFields: object): Promise<Publisher | null> {
        return prisma.publisher.findUnique({
            where: whereFields
        })
    }

}