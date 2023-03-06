import { SavingsType } from './../../domains/saving/enums';
import JOI from 'joi';
import { RequestProperty } from '../../middleware/types';

const savingValidation = {
  createSaving: {
    schema: JOI.object().keys({
      title: JOI.string().required(),
      numberOfMembers: JOI.number().required().max(5),
      fixedTarget: JOI.boolean().default(false),
      target: JOI.string().optional(),
      savingsType: JOI.string().default(SavingsType.AUTOMATIC),
      frequency: JOI.string().required(),
      startDate: JOI.number().required(),
      endDate: JOI.number().required(),
      duration: JOI.number().required(),
    }),
    requestProperty: RequestProperty.BODY,
  },

  fetchById: {
    schema: JOI.object().keys({
      planId: JOI.string().required().trim(),
    }),
    requestProperty: RequestProperty.PARAMS,
  },
};

export default savingValidation;
