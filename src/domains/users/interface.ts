import { Request, Response } from 'express';
import { IBaseResponse } from '../../commons/interface';
import IBaseModel from '../../commons/models/interface';

export interface IUsersModel extends IBaseModel {
  email: string;
  password: string;
  username: string;
}

export interface IUserController {
  registerUser: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  userLogin: (req: Request, res: Response) => Promise<Response<IBaseResponse>>;
  getUsers: (req: Request, res: Response) => Promise<Response<IBaseResponse>>;
  getAuthUser: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  getUserByUsername: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
}
