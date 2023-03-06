import { NextFunction, Response } from 'express';
import statusCodes, { ReasonPhrases } from 'http-status-codes';
import { decryptJwtToken } from './../domains/users/utils/modifiers';
import { AuthRequest } from './interface';

const { UNAUTHORIZED } = statusCodes;

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authorization = (req.headers.authorization || '') as string;
  const token = authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(UNAUTHORIZED).send({
      data: null,
      status: false,
      message: ReasonPhrases.UNAUTHORIZED,
    });
  }

  const response = decryptJwtToken({
    token,
    secret: process.env._SECRET || '',
  });

  req.id = response?.customerId;
  next();
};

export default auth;
