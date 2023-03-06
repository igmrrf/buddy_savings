import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { StatusCodes } from 'http-status-codes';

import { RequestProperty } from './types';

const { UNPROCESSABLE_ENTITY } = StatusCodes;

const validator: ({
  schema,
  requestProperty,
}: {
  schema: ObjectSchema<any>;
  requestProperty: RequestProperty;
}) => (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Response<any, Record<string, any>> = ({
  schema,
  requestProperty,
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[requestProperty]);

    if (!error) {
      return next();
    } else {
      const { details } = error as { details: any[] };
      const message = details.map((i) => i.message).join(',');
      return res.status(UNPROCESSABLE_ENTITY).send({
        data: message,
        message: 'BAD REQUEST',
        status: UNPROCESSABLE_ENTITY,
      });
    }
  };
};

export default validator;
