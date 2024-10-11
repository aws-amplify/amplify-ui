import { TaskAction, TaskActionInput, TaskActionOutput } from '../types';

interface DeleteActionOptions {
  key: string;
}
export interface DeleteActionInput
  extends TaskActionInput<DeleteActionOptions> {}
export interface DeleteActionOutput extends TaskActionOutput {}

export interface DeleteAction
  extends TaskAction<DeleteActionInput, DeleteActionOutput> {}

export const deleteAction: DeleteAction = null as unknown as DeleteAction;
