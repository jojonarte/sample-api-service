import { BaseRepository, OrderOptions, PaginationOptions } from 'src/database/repositories/base'
import { Transaction } from 'objection';
import { App } from '../models/app';

export interface AppOrderOptions extends OrderOptions {
  column: 'id' | 'createdAt'
}

export interface FilterOptions {
  order: AppOrderOptions
  pagination: PaginationOptions
}

export class AppRepository extends BaseRepository<App> {
  public constructor(transaction?: Transaction) {
    super(App, transaction);
  }
}

export const appRepository = new AppRepository();