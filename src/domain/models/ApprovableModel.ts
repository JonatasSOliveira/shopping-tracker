import { Field } from "@/decorators/database/Field";
import { UserTrackedModel, UserTrackedModelFields } from "./UserTracked";
import { Default } from "@/decorators/database/Default";

export enum ApprovalStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface ApprovableModelFields extends UserTrackedModelFields {
  approvedAt: Date | null;
  approvedByUserId: string | null;
  approvalStatus: ApprovalStatus | null;
}

export abstract class ApprovableModel extends UserTrackedModel {
  @Field()
  protected approvedAt: Date | null = null;

  @Field()
  protected approvedByUserId: string | null = null;

  @Field({ type: "enum", enumObject: ApprovalStatus })
  @Default(ApprovalStatus.Pending)
  protected approvalStatus: ApprovalStatus = ApprovalStatus.Pending;

  constructor(data: Partial<ApprovableModelFields>) {
    super(data);
    this.approvedAt = data.approvedAt ?? null;
    this.approvedByUserId = data.approvedByUserId ?? null;
    this.approvalStatus = data.approvalStatus ?? this.approvalStatus;
  }

  public getApprovedAt(): Date | null {
    return this.approvedAt;
  }

  public getApprovedByUserId(): string | null {
    return this.approvedByUserId;
  }

  public getApprovalStatus(): ApprovalStatus {
    return this.approvalStatus;
  }
}
