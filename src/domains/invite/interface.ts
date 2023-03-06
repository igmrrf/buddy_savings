import { Request, Response } from 'express';
import { IBaseResponse } from '../../commons/interface';
import IBaseModel from '../../commons/models/interface';
import { SavingsType, SavingsFrequency } from '../saving/enums';
import { InviteStatus } from './enums';

export interface ISavingModel extends IBaseModel {
  savingId: string;
  inviteeId: string;
  savingOwnerId: string;
  relationship: string;
  status: InviteStatus;
}

export interface IInvitesController {
  sendInvite: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  viewInvite: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  respondToInvite: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  viewAllRecievedInvites: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  viewAllSentInvites: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
}
