import {
  DataTaskAction,
  DataTaskActionInput,
  DataTaskActionOutput,
} from '../types';

export interface DeleteActionInput extends DataTaskActionInput {}
export interface DeleteActionOutput extends DataTaskActionOutput {}

export interface DeleteAction extends DataTaskAction<DataTaskActionInput> {}

export const deleteAction: DeleteAction = null as unknown as DeleteAction;
