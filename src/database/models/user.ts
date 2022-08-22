import { BaseModel } from 'src/database/models/base'
import { hashPassword } from 'src/utils/crypto';

export class User extends BaseModel {
  public static tableName = 'users'
  public username: string;
  public password: string;

  protected $transformJSON = {
    omit: ['deletedAt', 'createdAt', 'updatedAt'],
  }

  public async $beforeInsert(): Promise<void> {
    if (this.password) {
        this.password = await hashPassword(this.password)
    }
  }

  public async $beforeUpdate(): Promise<void> {
    if (this.password) {
        this.password = await hashPassword(this.password)
    }
  }

}