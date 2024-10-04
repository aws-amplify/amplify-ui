import {
  DataTaskAction,
  DataTaskActionInput,
  DataTaskActionOutput,
} from '../types';

interface CreateFolderActionData {
  target: string;
}
interface CreateFolderActionOptions {
  preventOverwite?: boolean;
}
export interface CreateFolderActionInput
  extends DataTaskActionInput<
    CreateFolderActionData,
    CreateFolderActionOptions
  > {}
export interface CreateFolderActionOutput extends DataTaskActionOutput {}

export interface CreateFolderAction
  extends DataTaskAction<DataTaskActionInput> {}

export const createFolderAction: CreateFolderAction =
  null as unknown as CreateFolderAction;
