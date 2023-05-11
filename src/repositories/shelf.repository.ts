import { Shelf } from "@prisma/client"

export interface CreateShelfData { 
  name: string,
  user_id: number
}

export interface ShelfRepository {
  create(data: CreateShelfData): Promise<Shelf>
  findUnique(whereFields: object): Promise<Shelf|null>
  findFirst(whereFields: object): Promise<Shelf|null>
  update(whereFields: object, data: object): Promise<Shelf>
}