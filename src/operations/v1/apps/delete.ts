import { NotFoundError } from 'objection';
import { appRepository } from 'src/database/repositories/apps';
import { Operation, OperationOutput } from 'src/operations/operation';

interface OperationInput {
  appId: number;
}

class DeleteApp extends Operation<OperationInput, OperationOutput> {
  protected async run(requestData: OperationInput): Promise<OperationOutput> {
    if (await appRepository.findById(requestData.appId)) {
      await appRepository.deleteById(requestData.appId);

      return {
        success: true,
        data: null
      }
    }

    throw new NotFoundError();
  }
}

export const deleteApp = new DeleteApp();