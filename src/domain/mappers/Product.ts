import { ProductFormDTO } from "@/dtos/product/request/Form";
import { Product, ProductFields } from "@/models/Product";
import { ModelMapperPort } from "@/ports/middleware/Mapper";
import { capitalizeWords } from "@/utils/string";

export class ProductMapper
  implements ModelMapperPort<Product, ProductFields, ProductFormDTO>
{
  public fromDTO(data: ProductFormDTO): Product {
    return new Product({
      ...data,
      brand: data.brand ? capitalizeWords(data.brand) : undefined,
      name: data.name ? capitalizeWords(data.name) : undefined,
    });
  }

  public fromFields(data: ProductFields): Product {
    return new Product({
      ...data,
      brand: data.brand ? capitalizeWords(data.brand) : undefined,
      name: data.name ? capitalizeWords(data.name) : undefined,
    });
  }

  public toDTO(model: Product): ProductFormDTO {
    const createDTO = new ProductFormDTO();
    createDTO.updateDataFromObject({
      brand: model.getBrand() || "",
      name: model.getName(),
      barCode: model.getBarCode(),
    });
    return createDTO;
  }

  public toFields(model: Product): ProductFields {
    return {
      id: model.getId(),
      name: model.getName(),
      barCode: model.getBarCode(),
      brand: model.getBrand(),
      imageUrl: model.getImageUrl() ?? null,
      approvedAt: model.getApprovedAt(),
      createdAt: model.getCreatedAt(),
      updatedAt: model.getUpdatedAt(),
      approvalStatus: model.getApprovalStatus(),
      approvedByUserId: model.getApprovedByUserId(),
      createdByUserId: model.getCreatedByUserId(),
      deletedByUserId: model.getDeletedByUserId(),
      updatedByUserId: model.getUpdatedByUserId(),
      deletedAt: model.getDeletedAt(),
    };
  }
}
