import {
  DataType,
  Table,
  Column,
  AllowNull,
  Unique,
  Index,
  AfterCreate,
} from 'sequelize-typescript';
import { TABLES } from '../../commons/constants';
import BaseModel from '../../commons/models/base';

@Table({ tableName: TABLES.USER, timestamps: false })
export default class UserModel extends BaseModel {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Unique
  @Index
  @Column(DataType.STRING)
  username!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;
}
