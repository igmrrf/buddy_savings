import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { config } from 'dotenv';
import { InviteController, InviteModel, InviteService } from './domains/invite';
import { SavingController, SavingModel, SavingService } from './domains/saving';
import { UsersController, UsersModel, UsersService } from './domains/users';

config();

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  env: asValue(process.env),

  usersController: asClass(UsersController),
  usersService: asClass(UsersService),
  usersModel: asClass(UsersModel),

  savingController: asClass(SavingController),
  savingService: asClass(SavingService),
  savingModel: asClass(SavingModel),

  inviteController: asClass(InviteController),
  inviteService: asClass(InviteService),
  inviteModel: asClass(InviteModel),
});

export default container;
