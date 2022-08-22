import { BaseModel } from 'src/database/models/base'

export class App extends BaseModel {
    public static tableName = 'apps'
    public name: string;
    public description: string;
    public imageUrl: string;

    protected $transformJSON = {
        omit: ['deletedAt', 'createdAt', 'updatedAt'],
    }
}