import { Product, ProductFields } from "@/models/Product";
import { CRUDService } from "./CRUD";
import { ProductFormDTO } from "@/dtos/product/request/Form";
import { ProductPortIn } from "@/ports/in/Product";
import { LogLevel } from "./Logger";
import { ApprovalStatus } from "@devjonatas/devkit/models";

export class ProductService
  extends CRUDService<Product, ProductFields, ProductFormDTO>
  implements ProductPortIn
{
  async findByBarCode(barCode: string): Promise<Product | null> {
    try {
      this.log(
        LogLevel.DEBUG,
        `Searching for entry by bar code (barCode: ${barCode})`,
      );
      const results = await this.repository.listAll({
        where: { barCode, approvalStatus: ApprovalStatus.Approved },
      });
      const found = results[0] ?? null;
      if (found) {
        this.log(LogLevel.INFO, `Entry found (barCode: ${barCode})`);
      } else {
        this.log(LogLevel.INFO, `No entry found (barCode: ${barCode})`);
      }
      return found;
    } catch (error) {
      this.log(
        LogLevel.ERROR,
        `Error finding entry by bar code (barCode: ${barCode})`,
        error,
      );
      throw error;
    }
  }
}
