import { ProductFormDTO } from "@/dtos/product/request/Form";
import { Product, ProductFields } from "@/models/Product";
import { ModelMapperPort } from "@/ports/middleware/Mapper";

export class ProductMapper
  implements ModelMapperPort<Product, ProductFields, ProductFormDTO>
{
  public fromDTO(data: ProductFormDTO): Product {
    return new Product(data);
  }

  public fromFields(data: ProductFields): Product {
    return new Product(data);
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
}
