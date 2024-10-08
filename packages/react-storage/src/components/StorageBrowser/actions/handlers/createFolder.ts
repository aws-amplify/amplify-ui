import { TaskHandler, TaskHandlerInput, TaskHandlerOutput } from '../types';

interface CreateFolderHandlerData {
  target: string;
}
interface CreateFolderHandlerOptions {
  preventOverwite?: boolean;
}
export interface CreateFolderHandlerInput
  extends TaskHandlerInput<
    CreateFolderHandlerData,
    CreateFolderHandlerOptions
  > {}
export interface CreateFolderHandlerOutput extends TaskHandlerOutput {}

export interface CreateFolderHandler
  extends TaskHandler<CreateFolderHandlerInput, CreateFolderHandlerOutput> {}

export const createFolderHandler: CreateFolderHandler =
  null as unknown as CreateFolderHandler;
