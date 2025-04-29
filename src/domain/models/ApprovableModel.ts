import { Field } from "@/decorators/database/Field";
import { UserTrackedModel, UserTrackedModelFields } from "./UserTracked";

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
  protected approvalStatus: ApprovalStatus;

  constructor(data: ApprovableModelFields) {
    super(data);
    this.approvedAt = data.approvedAt;
    this.approvedByUserId = data.approvedByUserId;
    this.approvalStatus = data.approvalStatus ?? ApprovalStatus.Pending;
  }
}
