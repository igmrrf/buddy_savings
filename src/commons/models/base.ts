import dayjs from 'dayjs';
import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';
import * as uuid from 'uuid';

export default class BaseModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isArchived!: boolean;

  @CreatedAt
  @Column(DataType.INTEGER)
  createdAt?: number;

  @UpdatedAt
  @Column(DataType.INTEGER)
  updatedAt?: number;

  @BeforeCreate
  static addEntityId(instance: BaseModel): void {
    const now = dayjs().unix();

    instance.id = uuid.v4();

    instance.createdAt = now;
    instance.updatedAt = now;
  }

  @BeforeUpdate
  static updateDate(instance: BaseModel): void {
    const now = dayjs().unix();
    instance.updatedAt = now;
  }
}
