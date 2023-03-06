import { IUserController } from './../../domains/users/interface';
import express from 'express';
import container from '../../container';
import auth from '../../middleware/auth';
import validate from '../../middleware/inputValidator';
import UserValidation from '../validations/userValidation';

const userRouter = express.Router();

const usersController: IUserController = container.resolve('usersController');

userRouter.post(
  '/register',
  validate(UserValidation.register),
  usersController.registerUser
);
userRouter.post(
  '/login',
  validate(UserValidation.login),
  usersController.userLogin
);
userRouter.get(
  '/username/:username',
  validate(UserValidation.fetchByUsername),
  usersController.getUserByUsername
);
userRouter.get('/', auth, usersController.getAuthUser);

export default userRouter;
