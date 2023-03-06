import { AppServer } from './commons/utils';
import { InviteModel } from './domains/invite';
import { SavingModel } from './domains/saving';
import { UsersModel } from './domains/users';
import { apiRoutes } from './routes';

const Server = new AppServer({
  routes: {
    api: apiRoutes,
  },
  models: [UsersModel, SavingModel, InviteModel],
});

// initiate server
Server.serve();
