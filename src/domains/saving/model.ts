import {
  DataType,
  Table,
  Column,
  AllowNull,
  Unique,
  Max,
  Default,
  Index,
  AfterCreate,
} from 'sequelize-typescript';
import { TABLES } from '../../commons/constants';
import BaseModel from '../../commons/models/base';
import { SavingsFrequency, SavingsType } from './enums';

@Table({ tableName: TABLES.SAVING, timestamps: false })
export default class SavingModel extends BaseModel {
  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  customerId!: string;

  @AllowNull(false)
  @Max(5)
  @Column(DataType.INTEGER)
  numberOfMembers!: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  fixedTarget!: boolean;

  @Default('')
  @Column(DataType.STRING)
  target?: string;

  @Default(SavingsType.AUTOMATIC)
  @Column(DataType.STRING)
  savingsType?: SavingsType;

  @Default(SavingsFrequency.MONTHLY)
  @Column(DataType.STRING)
  frequency?: SavingsFrequency;

  @Column(DataType.INTEGER)
  startDate?: number;

  @Column(DataType.INTEGER)
  endDate?: number;

  @Column(DataType.INTEGER)
  duration!: number;
}
