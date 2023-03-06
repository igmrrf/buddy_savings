import { ISavingController } from './../../domains/saving/interface';
import express from 'express';
import container from '../../container';
import auth from '../../middleware/auth';
import validate from '../../middleware/inputValidator';
import savingValidation from '../validations/savingValidation';

const savingRouter = express.Router();

const savingController: ISavingController = container.resolve(
  'savingController'
);

savingRouter.get('/', auth, savingController.fetchSavings);
savingRouter.post(
  '/',
  auth,
  validate(savingValidation.createSaving),
  savingController.createSaving
);
savingRouter.get(
  '/:planId',
  auth,
  validate(savingValidation.fetchById),
  savingController.fetchSaving
);

export default savingRouter;
