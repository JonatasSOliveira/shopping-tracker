import { Field } from "@/decorators/database/Field";
import { UserTrackedModel, UserTrackedModelFields } from "./UserTracked";
import { Default } from "@/decorators/database/Default";

export enum ApprovalStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface ApprovableModelFields extends UserTrackedModelFields {
  approvedAt?: Date;
  approvedByUserId?: string;
  approvalStatus?: ApprovalStatus;
}

export abstract class ApprovableModel extends UserTrackedModel {
  @Field()
  protected approvedAt?: Date;

  @Field()
  protected approvedByUserId?: string;

  @Field({ type: "enum", enumObject: ApprovalStatus })
  @Default(ApprovalStatus.Pending)
  protected approvalStatus: ApprovalStatus = ApprovalStatus.Pending;

  constructor(data: ApprovableModelFields) {
    super(data);
    this.approvedAt = data.approvedAt;
    this.approvedByUserId = data.approvedByUserId;
    this.approvalStatus = data.approvalStatus ?? this.approvalStatus;
  }
}
