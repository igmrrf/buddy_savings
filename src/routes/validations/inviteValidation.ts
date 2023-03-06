import { SavingsType } from './../../domains/saving/enums';
import JOI from 'joi';
import { RequestProperty } from '../../middleware/types';

const inviteValidation = {
  sendInvite: {
    schema: JOI.object().keys({
      savingId: JOI.string().required(),
      inviteeId: JOI.string().required(),
      relationship: JOI.string().optional(),
    }),
    requestProperty: RequestProperty.BODY,
  },

  respondToInvite: {
    schema: JOI.object().keys({
      status: JOI.string().required(),
      savingId: JOI.string().required(),
    }),
    requestProperty: RequestProperty.BODY,
  },
};

export default inviteValidation;
