import cors from 'cors';
import express, {
  ErrorRequestHandler,
  Express,
  NextFunction,
  Request,
  Response,
} from 'express';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { APP_USE_LIMIT, defaultCatchBlock } from './constants';
import { Defaults, ErrorStatus } from './enum';
import { IServer } from './interface';
import { ServerProperties } from './types';

const { BAD_REQUEST } = StatusCodes;

class Server implements IServer {
  PORT: string;
  App: Express;
  models: ModelCtor<Model<any, any>>[] = [];

  MIN_SQL_POOL = 1; // Increase min SQL pool in production environment
  MAX_SQL_POOL = 20; // Increase max SQL pool in production environment

  constructor({ port = Defaults.PORT, routes, models = [] }: ServerProperties) {
    this.PORT = port;
    this.models = models;

    // Initiate Express App;
    this.App = express();

    // Server Middlewares
    this.App.use(cors());
    this.App.use(helmet());
    this.App.use(express.json());
    this.App.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.App.use(APP_USE_LIMIT);
    this.App.use(
      (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        return defaultCatchBlock(res);
      }
    );

    /** Setup Idempotency */
    this.App.use(this.setupIdempotency.bind(this));

    if (routes.api) {
      this.App.use('/api', routes.api);
    }

    if (routes.webhook) {
      this.App.use('/webhook', routes.webhook);
    }
  }

  private async setupIdempotency(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<NextFunction | Response | void> {
    const shouldSkipIdempotency = req.method === 'GET';

    if (shouldSkipIdempotency) {
      return next();
    }

    const Idempotency = (req.headers['x-idempotent-key'] ||
      req.headers['X-Idempotent']) as string;

    if (!Idempotency) {
      return res.status(BAD_REQUEST).send({
        data: null,
        message: 'Operation is missing idempotent key',
        status: ErrorStatus.MISSING_IDEMPOTENT_KEY,
      });
    }

    // ToDo: check db if request with idempotentKey exists or has been completed previously
    return next();
  }

  private async initDB(): Promise<Sequelize> {
    const db = process.env._PSQL_DB || 'postgres';
    const username = process.env._PSQL_USERNAME || 'root';
    const password = process.env._PSQL_PASSWORD || 'postgres';
    const host = process.env._PSQL_HOST || 'localhost';
    const port = Number(process.env._PSQL_PORT) || 5432;

    const sequelize = new Sequelize({
      database: db,
      username,
      password,
      dialect: 'postgres',
      host,
      pool: {
        min: this.MIN_SQL_POOL,
        max: this.MAX_SQL_POOL,
        idle: 100,
        evict: 100,
        acquire: 60000,
      },
      port,
      models: this.models,
      logging: false,
    });

    try {
      await sequelize.authenticate();
      // await sequelize.sync({alter:true, force:true})
      console.log('Connection has been established successfully');
    } catch (error) {
      console.error('Unable to connect to database: ', error);
    }

    return sequelize;
  }

  serve() {
    this.initDB();

    this.App.listen(this.PORT, () => {
      console.log(`App is running on http:localhost:${this.PORT}`);
    });
  }
}

export default Server;
