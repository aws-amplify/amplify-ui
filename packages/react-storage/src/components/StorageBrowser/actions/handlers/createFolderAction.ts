import { TaskAction, TaskActionInput, TaskActionOutput } from '../types';

interface CreateFolderActionData {
  target: string;
}
interface CreateFolderActionOptions {
  preventOverwite?: boolean;
}
export interface CreateFolderActionInput
  extends TaskActionInput<CreateFolderActionData, CreateFolderActionOptions> {}
export interface CreateFolderActionOutput extends TaskActionOutput {}

export interface CreateFolderAction
  extends TaskAction<CreateFolderActionInput, CreateFolderActionOutput> {}

export const createFolderAction: CreateFolderAction =
  null as unknown as CreateFolderAction;
