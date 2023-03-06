import {
  DataType,
  Table,
  Column,
  AllowNull,
  Index,
  Default,
} from 'sequelize-typescript';
import { TABLES } from '../../commons/constants';
import BaseModel from '../../commons/models/base';
import { InviteStatus } from './enums';

@Table({ tableName: TABLES.INVITE, timestamps: false })
export default class InviteModel extends BaseModel {
  @AllowNull(false)
  @Index
  @Column(DataType.STRING)
  savingId!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  inviteeId!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  savingOwnerId!: string;

  @Column(DataType.STRING)
  relationship!: string;

  @Default(InviteStatus.PENDING)
  @Column(DataType.STRING)
  status!: InviteStatus;
}
