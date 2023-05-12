import { Shelf } from "@prisma/client"

export interface CreateShelfData { 
  name: string,
  user_id: number,
  is_default: boolean|null
}

export interface UpdateShelfData {
  id: number,
  name: string,
  user_id: number,
  is_default: boolean | null
}

export interface ShelfRepository {
  create(data: CreateShelfData): Promise<Shelf>
  findUnique(whereFields: object): Promise<Shelf|null>
  findFirst(whereFields: object): Promise<Shelf|null>
  update(whereFields: object, data: object): Promise<Shelf>
  delete(whereFields: object)
}