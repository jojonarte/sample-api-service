import { App } from 'src/database/models/app';
import { appRepository } from 'src/database/repositories/apps';
import { Operation, OperationOutput } from 'src/operations/operation';

interface OperationInput extends Partial<App> { }

class CreateApp extends Operation<OperationInput, OperationOutput> {
  protected async run(requestData: OperationInput): Promise<OperationOutput> {
    const insertResult = await appRepository.insert(requestData);

    return {
      success: true,
      data: insertResult
    }
  }
}

export const createApp = new CreateApp();