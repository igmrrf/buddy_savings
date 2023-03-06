import JOI from 'joi';
import { RequestProperty } from '../../middleware/types';

const UserValidation = {
  register: {
    schema: JOI.object().keys({
      email: JOI.string().email().required(),
      username: JOI.string().required().trim(),
      password: JOI.string().required(),
    }),
    requestProperty: RequestProperty.BODY,
  },

  login: {
    schema: JOI.object().keys({
      username: JOI.string().required().trim(),
      password: JOI.string().required(),
    }),
    requestProperty: RequestProperty.BODY,
  },

  fetchByUsername: {
    schema: JOI.object().keys({
      username: JOI.string().required().trim(),
    }),
    requestProperty: RequestProperty.PARAMS,
  },
};

export default UserValidation;
