import { Operation } from 'src/operations/operation';
import { appRepository } from 'src/database/repositories/apps';
import { App } from 'src/database/models/app';


interface OperationOutput {
  success: boolean,
  data: {
    apps: Partial<App>[]
    total: number
  }
}

class ListApps extends Operation<{}, OperationOutput> {
  protected async run(): Promise<OperationOutput> {
    const apps = await appRepository.findAll(true);

    return {
      success: true,
      data: {
        total: apps.length,
        apps,
      }
    }
  }
}

export const listApps = new ListApps();