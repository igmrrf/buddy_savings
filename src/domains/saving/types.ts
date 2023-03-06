import { SavingsFrequency, SavingsType } from './enums';

export type CreateSavingPayload = {
  title: string;
  numberOfMembers: number;
  fixedTarget: boolean;
  target: string;
  savingsType: SavingsType;
  frequency: SavingsFrequency;
  startDate: number;
  endDate: number;
  duration: number;
  customerId: string;
};
