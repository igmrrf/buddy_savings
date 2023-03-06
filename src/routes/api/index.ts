import express, { Request, Response } from 'express';
import inviteRouter from './invite';
import savingRouter from './saving';
import userRouter from './user';

const router = express.Router();

router.use('/user', userRouter);
router.use('/plan', savingRouter);
router.use('/plan/invite', inviteRouter);
router.use('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Buddy Savings' });
});

export default router;
