import { FindOptions } from 'sequelize';
import UserModel from './model';
import {
  CreateUserPayload,
  UserLoginPayload,
  UserLoginResponse,
  UsersEnv,
} from './types';
import {
  encryptPassword,
  comparePassword,
  generateJwtToken,
} from './utils/modifiers';

export default class UsersService {
  env: UsersEnv;
  constructor({ env }: { env: UsersEnv }) {
    this.env = env;
  }

  fetchUser = async (cond: FindOptions): Promise<UserModel | null> => {
    const user = await UserModel.findOne({
      ...cond,
    });
    return user;
  };

  fetchUsers = async (cond: FindOptions): Promise<UserModel[]> => {
    const user = await UserModel.findAll({
      ...cond,
    });

    return user;
  };

  createUser = async (props: CreateUserPayload): Promise<UserModel | void> => {
    const { email, username, password } = props;
    try {
      const user = await this.fetchUser({ where: { email } });

      // NOTE: user would have already checked if username already exists with provided endpoint
      if (user) {
        throw new Error('User already exists');
      }

      const hash = encryptPassword(password);
      const newUser = await UserModel.create({
        email,
        username,
        password: hash,
      });

      return newUser;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  userLogin = async (
    props: UserLoginPayload
  ): Promise<UserLoginResponse | void> => {
    const { username, password } = props;
    try {
      const user = await this.fetchUser({
        where: { username },
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        throw new Error('Invalid login details');
      }

      const isMatchingPassword = comparePassword({
        password,
        hash: user.password,
      });

      if (!user) {
        throw new Error('Invalid login details');
      }

      const token = generateJwtToken({
        customerId: user.id,
        secret: this.env._SECRET,
        algorithm: this.env._ALGO,
      });

      return {
        token,
        user,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };
}
