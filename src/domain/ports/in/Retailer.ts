import { RetailerCreateDto } from '@dtos/retailer/request/Create'

export interface RetailerPortIn {
  public create(data: RetailerCreateDto): Promise<string>
}