import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { defaultCatchBlock } from '../../commons/utils/constants';
import { AuthRequest } from '../../middleware/interface';
import { ISavingController } from './interface';
import SavingService from './service';

export default class SavingController implements ISavingController {
  private savingService: SavingService;

  constructor({ savingService }: { savingService: SavingService }) {
    this.savingService = savingService;
  }

  createSaving = async (req: AuthRequest, res: Response) => {
    try {
      const plan = await this.savingService.createSaving({
        ...req.body,
        customerId: req?.id,
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Created Plan successfully',
        data: plan,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  fetchSavings = async (req: AuthRequest, res: Response) => {
    try {
      const plan = await this.savingService.fetchSavings({
        where: { customerId: req?.id },
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Fetched Saving Plan successfully',
        data: plan,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  fetchSaving = async (req: Request, res: Response) => {
    const { planId } = req.params;
    try {
      const plan = await this.savingService.fetchSaving({
        where: { id: planId },
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Fetched Saving Plans successfully',
        data: plan,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };
}
