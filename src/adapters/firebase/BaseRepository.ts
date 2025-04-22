import {
  collection,
  Firestore,
  getDocs,
  query,
  where as fbWhere,
  updateDoc,
  doc,
  DocumentData,
  setDoc,
} from "firebase/firestore";
import { BaseModel, BaseModelFields } from "@/models/Base";
import { ModelMapperPort } from "@/ports/middleware/Mapper";
import { BaseRepository } from "@/ports/out/BaseRepository";
import { Logger, LogLevel } from "@/services/Logger";
import { getTableName } from "@/decorators/database/Model";
import { Where } from "@/types/repositories/Where";

export class FirebaseBaseRepositoryAdapter<
  Model extends BaseModel,
  Fields extends BaseModelFields,
> implements BaseRepository<Model, Fields>
{
  constructor(
    protected firestore: Firestore,
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

    const docRef = doc(this.firestore, getTableName(this.modelClass), id);
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
      `[FirebaseRepository] Listing all ${this.modelClass.name} with options ` +
        JSON.stringify(options),
    );

    const collectionRef = collection(
      this.firestore,
      getTableName(this.modelClass),
    );
    let q = query(collectionRef);

    if (options?.where) {
      for (const [key, value] of Object.entries(options.where)) {
        q = query(q, fbWhere(key, "==", value));
      }
    }

    const snapshot = await getDocs(q);
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

    const collectionRef = collection(
      this.firestore,
      getTableName(this.modelClass),
    );
    let q = query(collectionRef);

    for (const [key, value] of Object.entries(where)) {
      q = query(q, fbWhere(key, "==", value));
    }

    const snapshot = await getDocs(q);

    const updatePromises = snapshot.docs.map((docSnap) => {
      const reference = doc(
        this.firestore,
        getTableName(this.modelClass),
        docSnap.id,
      );

      const updateData = this.mapper.toFields(data) as Partial<DocumentData>; // 👈 cast necessário aqui

      return updateDoc(reference, updateData);
    });

    await Promise.all(updatePromises);

    Logger.log(
      LogLevel.INFO,
      `[FirebaseRepository] Updated ${updatePromises.length} ${this.modelClass.name}`,
    );
  }
}
