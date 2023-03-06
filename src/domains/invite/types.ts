import { InviteStatus } from './enums';

export type SendInvitePayload = {
  savingId: string;
  inviteeId: string;
  relationship: string;
  savingOwnerId: string;
};

export type RespondToInvitePayload = {
  status: InviteStatus;
  savingId: string;
  customerId: string;
};
