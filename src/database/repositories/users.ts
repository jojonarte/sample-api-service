import { BaseRepository, OrderOptions, PaginationOptions } from 'src/database/repositories/base'
import { QueryBuilderYieldingOneOrNone, Transaction } from 'objection';
import { User } from '../models/user';

export interface UserOrderOptions extends OrderOptions {
  column: 'id' | 'createdAt'
}

export interface FilterOptions {
  order: UserOrderOptions
  pagination: PaginationOptions
}

export class UserRepository extends BaseRepository<User> {
  public constructor(transaction?: Transaction) {
    super(User, transaction);
  }

  public findByUsername(username: string): QueryBuilderYieldingOneOrNone<User> {
    return this.findAll(true).where({ username }).first()
  }
}

export const userRepository = new UserRepository();