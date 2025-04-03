import { RetailerCreateDto } from '@dtos/retailer/request/Create'

export interface RetailerRepository {
  public create(data: RetailerCreateDto): Promise<string>
}