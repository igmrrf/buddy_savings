import { FindOptions, Op } from 'sequelize';
import SavingService from '../saving/service';
import { InviteStatus } from './enums';
import InviteModel from './model';
import { RespondToInvitePayload, SendInvitePayload } from './types';

export default class InviteService {
  private savingService: SavingService;

  constructor({ savingService }: { savingService: SavingService }) {
    this.savingService = savingService;
  }

  fetchInvites = async (cond: FindOptions): Promise<InviteModel[]> => {
    const plan = await InviteModel.findAll({
      ...cond,
    });
    return plan;
  };

  fetchInvite = async (
    cond: FindOptions
  ): Promise<InviteModel | null> => {
    const plan = await InviteModel.findOne({
      ...cond,
    });
    return plan;
  };

  sendInvite = async (
    payload: SendInvitePayload
  ): Promise<InviteModel | null> => {
    const { savingId, inviteeId, relationship, savingOwnerId } =
      payload;
    try {
      const plan = await this.savingService.fetchSaving({
        where: { id: savingId, isArchived: false },
      });

      if (!plan) {
        throw new Error('no plan found for id');
      }

      const alreadyInvited = await this.fetchInvite({
        where: { savingId, isArchived: false, inviteeId },
      });

      if (
        alreadyInvited &&
        [InviteStatus.PENDING, InviteStatus.ACCEPTED].includes(
          alreadyInvited.status
        )
      ) {
        throw new Error('User already invited');
      }

      const existingInvites = await this.fetchInvites({
        where: {
          savingId,
          isArchived: false,
          status: {
            [Op.in]: [InviteStatus.PENDING, InviteStatus.ACCEPTED],
          },
        },
      });

      const totalNumberOfInvitedMembers = plan.numberOfMembers;
      if (existingInvites.length >= totalNumberOfInvitedMembers) {
        throw new Error('Plan at capacity ');
      }

      const invite = await InviteModel.create({
        savingId,
        inviteeId,
        relationship,
        savingOwnerId,
      });

      return invite;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message);
    }
  };

  respondToInvite = async (payload: RespondToInvitePayload) => {
    const { customerId, status, savingId } = payload;
    try {
      console.log(payload);
      const invite = await InviteModel.update(
        { status },
        { where: { inviteeId: customerId, savingId } }
      );

      return invite;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message);
    }
  };
}
