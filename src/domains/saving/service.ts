import { FindOptions } from 'sequelize';
import SavingModel from './model';
import { CreateSavingPayload } from './types';

export default class SavingService {
  fetchSavings = async (cond: FindOptions): Promise<SavingModel[]> => {
    const plan = await SavingModel.findAll({
      ...cond,
    });
    return plan;
  };

  fetchSaving = async (
    cond: FindOptions
  ): Promise<SavingModel | null> => {
    const plan = await SavingModel.findOne({
      ...cond,
    });
    return plan;
  };

  createSaving = async (
    payload: CreateSavingPayload
  ): Promise<SavingModel> => {
    const {
      title,
      numberOfMembers,
      fixedTarget,
      target,
      savingsType,
      frequency,
      startDate,
      endDate,
      duration,
      customerId,
    } = payload;

    if (fixedTarget && !target) {
      throw new Error(`target amount is required`);
    }

    const plan = await this.fetchSaving({ where: { title, customerId } });

    if (plan) {
      throw new Error(`Plan wit title: ${title} already exists`);
    }

    try {
      const newPlan = await SavingModel.create({
        title,
        numberOfMembers,
        fixedTarget,
        target,
        savingsType,
        frequency,
        startDate,
        endDate,
        duration,
        customerId,
      });

      return newPlan;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message);
    }
  };
}
