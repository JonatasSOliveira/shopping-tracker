import { BaseModel, BaseModelFields } from "@/models/Base";
import { ModelMapperPort } from "@/ports/middleware/Mapper";
import { BaseRepository } from "@/ports/out/BaseRepository";
import { Logger, LogLevel } from "@/services/Logger";
import { getTableName } from "@/decorators/database/Model";
import { Where } from "@/types/repositories/Where";
import { FirebaseProvider } from "@/infra/firebase/Provider";
import {
  Filter,
  FirebaseFirestoreTypes,
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

    const docRef = FirebaseProvider.getFirestore()
      .collection(getTableName(this.modelClass))
      .doc(id);
    await docRef.set(fields);

    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] ${this.modelClass.name} created with id ${id}`,
    );

    return id;
  }

  public async listAll(options?: { where?: Where<Fields> }): Promise<Model[]> {
    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Listing all ${this.modelClass.name} with options ` +
        JSON.stringify(options),
    );

    const collectionRef = FirebaseProvider.getFirestore().collection(
      getTableName(this.modelClass),
    );
    const filters: FirebaseFirestoreTypes.QueryFieldFilterConstraint[] = [];

    if (options?.where) {
      for (const [key, value] of Object.entries(options.where)) {
        filters.push(Filter(key, "==", value));
      }
    }

    let snapshot;
    if (filters.length > 0) {
      snapshot = await collectionRef.where(Filter.and(...filters)).get();
    } else {
      snapshot = await collectionRef.get();
    }

    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Found ${snapshot.size} ${this.modelClass.name}`,
    );

    return snapshot.docs.map((docSnap) =>
      this.mapper.fromFields({ ...(docSnap.data() as Fields), id: docSnap.id }),
    );
  }

  public async update(data: Model, where: Where<Fields>): Promise<void> {
    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Updating ${this.modelClass.name}`,
    );

    const collectionRef = FirebaseProvider.getFirestore().collection(
      getTableName(this.modelClass),
    );
    const filters: FirebaseFirestoreTypes.QueryFieldFilterConstraint[] = [];

    for (const [key, value] of Object.entries(where)) {
      filters.push(Filter(key, "==", value));
    }

    let snapshot;
    if (filters.length > 0) {
      snapshot = await collectionRef.where(Filter.and(...filters)).get();
    } else {
      snapshot = await collectionRef.get();
    }

    const updatePromises = snapshot.docs.map((docSnap) => {
      const reference = FirebaseProvider.getFirestore()
        .collection(getTableName(this.modelClass))
        .doc(docSnap.id);

      const updateData = this.mapper.toFields(data);

      return reference.update(updateData);
    });

    await Promise.all(updatePromises);

    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Updated ${updatePromises.length} ${this.modelClass.name}`,
    );
  }
}
