import bcrypt from 'bcryptjs';
import exp from 'constants';
import jwt, { Algorithm } from 'jsonwebtoken';
import {
  DecryptJwtTokenPayload,
  DecryptJwtTokenResponse,
  GenerateJwtTokenPayload,
  passwordHelperPayload,
} from '../types';

export const encryptPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (payload: passwordHelperPayload): boolean => {
  const { password, hash = '' } = payload;
  return bcrypt.compareSync(password, hash);
};

export const generateJwtToken = (payload: GenerateJwtTokenPayload): string => {
  const { customerId, secret, algorithm } = payload;

  const token = jwt.sign({ customerId }, secret, {
    algorithm,
    expiresIn: '1hr',
  });

  return token;
};

export const decryptJwtToken = (
  payload: DecryptJwtTokenPayload
): DecryptJwtTokenResponse => {
  const { token, secret } = payload;

  const decodedToken = jwt.verify(token, secret) as DecryptJwtTokenResponse;

  return decodedToken;
};
