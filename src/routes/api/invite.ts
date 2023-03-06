import express from 'express';
import container from '../../container';
import { IInvitesController } from '../../domains/invite/interface';
import auth from '../../middleware/auth';
import validate from '../../middleware/inputValidator';
import inviteValidation from '../validations/inviteValidation';

const inviteRouter = express.Router();

const inviteController: IInvitesController =
  container.resolve('inviteController');

inviteRouter.post(
  '/',
  auth,
  validate(inviteValidation.sendInvite),
  inviteController.sendInvite
);

inviteRouter.put(
  '/',
  auth,
  validate(inviteValidation.respondToInvite),
  inviteController.respondToInvite
);

inviteRouter.get('/id/:inviteId', auth, inviteController.viewInvite);
inviteRouter.get('/sent', auth, inviteController.viewAllSentInvites);
inviteRouter.get('/recieved', auth, inviteController.viewAllRecievedInvites);

export default inviteRouter;
