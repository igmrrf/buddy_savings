import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { defaultCatchBlock } from '../../commons/utils/constants';
import { AuthRequest } from '../../middleware/interface';
import { IInvitesController } from './interface';
import InviteService from './service';

export default class InviteController implements IInvitesController {
  private inviteService: InviteService;

  constructor({ inviteService }: { inviteService: InviteService }) {
    this.inviteService = inviteService;
  }

  sendInvite = async (req: AuthRequest, res: Response) => {
    try {
      const invite = await this.inviteService.sendInvite({
        ...req.body,
        savingOwnerId: req?.id,
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Invite sent successfully',
        data: invite,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  viewInvite = async (req: Request, res: Response) => {
    const { inviteId } = req.params;
    try {
      const invite = await this.inviteService.fetchInvite({
        where: { id: inviteId },
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Fetch invites successfully',
        data: invite,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  respondToInvite = async (req: AuthRequest, res: Response) => {
    const { savingId, status } = req.body;
    try {
      const invite = await this.inviteService.respondToInvite({
        customerId: req?.id || '',
        status,
        savingId,
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'update plan invite successfully',
        data: invite,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  viewAllReceivedInvites = async (req: AuthRequest, res: Response) => {
    try {
      const invite = await this.inviteService.fetchInvites({
        where: { inviteeId: req?.id },
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Fetch invites successfully',
        data: invite,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  viewAllSentInvites = async (req: AuthRequest, res: Response) => {
    try {
      const invite = await this.inviteService.fetchInvites({
        where: { savingOwnerId: req?.id },
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Fetch invites successfully',
        data: invite,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };
}
