import { Request, Response } from 'express';
import { IBaseResponse } from '../../commons/interface';
import IBaseModel from '../../commons/models/interface';
import { SavingsType, SavingsFrequency } from './enums';

export interface ISavingModel extends IBaseModel {
  title: string;
  customerid: string;
  numberOfMembers: number;
  fixedTarget: boolean;
  target: string;
  savingsType: SavingsType;
  frequency: SavingsFrequency;
  startDate: number;
  endDate: number;
  duration: number;
}
export interface ISavingController {
  createSaving: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  fetchSaving: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  fetchSavings: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
}
