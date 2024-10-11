import { TaskHandler, TaskHandlerInput, TaskHandlerOutput } from '../types';

interface DeleteHandlerOptions {
  key: string;
}
export interface DeleteHandlerInput
  extends TaskHandlerInput<DeleteHandlerOptions> {}
export interface DeleteHandlerOutput extends TaskHandlerOutput {}

export interface DeleteHandler
  extends TaskHandler<DeleteHandlerInput, DeleteHandlerOutput> {}

export const deleteHandler: DeleteHandler = null as unknown as DeleteHandler;
