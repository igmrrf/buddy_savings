import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { defaultCatchBlock } from '../../commons/utils/constants';
import { AuthRequest } from '../../middleware/interface';
import { IUserController } from './interface';
import UsersService from './service';

export default class UsersController implements IUserController {
  private usersService: UsersService;

  constructor({ usersService }: { usersService: UsersService }) {
    this.usersService = usersService;
  }

  registerUser = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    try {
      const registeredUsername = await this.usersService.createUser({
        email,
        password,
        username,
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Created account successfully',
        data: registeredUsername,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
      const user = await this.usersService.fetchUser({
        where: { username },
        attributes: { exclude: ['password'] },
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'User fetched successfully',
        data: user,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const user = await this.usersService.fetchUsers({
        attributes: { exclude: ['password'] },
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Users fetched successfully',
        data: user,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  getAuthUser = async (req: AuthRequest, res: Response) => {
    try {
      const user = await this.usersService.fetchUser({
        where: { id: req?.id },
        attributes: { exclude: ['password'] },
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'User fetched successfully',
        data: user,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  userLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const user = await this.usersService.userLogin({ username, password });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'User login successfully',
        data: user,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };
}
