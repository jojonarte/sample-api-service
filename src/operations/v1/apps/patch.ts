import { NotFoundError } from 'objection';
import { App } from 'src/database/models/app';
import { appRepository } from 'src/database/repositories/apps';
import { Operation, OperationOutput } from 'src/operations/operation';


interface OperationInput extends Partial<App> {
  id: number;
}

class PatchApp extends Operation<OperationInput, OperationOutput> {
  protected async run(requestData: OperationInput): Promise<OperationOutput> {
    if (await appRepository.findById(requestData.id)) {
      await appRepository.patchById(requestData.id, requestData);

      return {
        success: true,
        data: requestData
      }
    }

    throw new NotFoundError();
  }
}

export const patchApp = new PatchApp();