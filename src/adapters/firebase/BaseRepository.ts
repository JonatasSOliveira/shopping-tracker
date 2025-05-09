import { BaseModel, BaseModelFields } from "@/models/Base";
import { ModelMapperPort } from "@/ports/middleware/Mapper";
import { BaseRepository } from "@/ports/out/BaseRepository";
import { Logger, LogLevel } from "@/services/Logger";
import { getTableName } from "@/decorators/database/Model";
import { Where } from "@/types/repositories/Where";

// Importações modulares do Firebase
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  QueryFieldFilterConstraint,
  getDoc,
} from "@react-native-firebase/firestore";

export class FirebaseBaseRepositoryAdapter<
  Model extends BaseModel,
  Fields extends BaseModelFields,
> implements BaseRepository<Model, Fields>
{
  constructor(
    protected mapper: ModelMapperPort<Model, Fields, any>,
    protected modelClass: new (data: Fields) => Model,
  ) {}

  public async create(data: Model): Promise<string> {
    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Creating ${this.modelClass.name}`,
    );

    const id = data.getId();
    const fields = this.mapper.toFields(data);

    const db = getFirestore();
    const docRef = doc(db, getTableName(this.modelClass), id);
    await setDoc(docRef, fields);

    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] ${this.modelClass.name} created with id ${id}`,
    );

    return id;
  }

  public async listAll(options?: { where?: Where<Fields> }): Promise<Model[]> {
    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Listing all ${this.modelClass.name} with options ${JSON.stringify(options)}`,
    );

    const db = getFirestore();
    const tableName = getTableName(this.modelClass);
    const collectionRef = collection(db, tableName);

    const filters: QueryFieldFilterConstraint[] = [];
    const whereConditions = options?.where ?? { id: undefined };
    const { id, ...otherFilters } = whereConditions;

    // Monta os filtros para os outros campos
    for (const [key, value] of Object.entries(otherFilters)) {
      filters.push(where(key, "==", value));
    }

    // Se tiver outros filtros além de id
    if (Object.keys(otherFilters).length > 0) {
      const q = query(collectionRef, ...filters);
      const snapshot = await getDocs(q);

      Logger.log(
        LogLevel.INFO,
        `[FirebaseRepository] Found ${snapshot.size} ${this.modelClass.name}`,
      );

      return snapshot.docs
        .filter((docSnap) => !id || docSnap.id === id) // se também veio um id, filtra em memória
        .map((docSnap) =>
          this.mapper.fromFields({
            ...(docSnap.data() as Fields),
            id: docSnap.id,
          }),
        );
    }

    // Caso esteja filtrando apenas por ID
    if (id) {
      const docSnap = await getDoc(doc(db, tableName, id));
      if (docSnap.exists) {
        Logger.log(
          LogLevel.INFO,
          `[FirebaseRepository] Found 1 ${this.modelClass.name} by ID`,
        );
        return [
          this.mapper.fromFields({
            ...(docSnap.data() as Fields),
            id: docSnap.id,
          }),
        ];
      } else {
        Logger.log(
          LogLevel.INFO,
          `[FirebaseRepository] No ${this.modelClass.name} found with ID ${id}`,
        );
        return [];
      }
    }

    // Nenhum filtro — busca tudo
    const snapshot = await getDocs(collectionRef);

    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Found ${snapshot.size} ${this.modelClass.name}`,
    );

    return snapshot.docs.map((docSnap) =>
      this.mapper.fromFields({ ...(docSnap.data() as Fields), id: docSnap.id }),
    );
  }

  public async update(data: Model, whereClause: Where<Fields>): Promise<void> {
    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Updating ${this.modelClass.name}`,
    );

    const db = getFirestore();
    const collectionRef = collection(db, getTableName(this.modelClass));

    const filters = Object.entries(whereClause).map(([key, value]) =>
      where(key, "==", value),
    );
    const q = query(collectionRef, ...filters);

    const snapshot = await getDocs(q);

    const updatePromises = snapshot.docs.map((docSnap) => {
      const docRef = doc(db, getTableName(this.modelClass), docSnap.id);
      const updateData = this.mapper.toFields(data);
      return updateDoc(docRef, updateData as any);
    });

    await Promise.all(updatePromises);

    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Updated ${updatePromises.length} ${this.modelClass.name}`,
    );
  }
}
