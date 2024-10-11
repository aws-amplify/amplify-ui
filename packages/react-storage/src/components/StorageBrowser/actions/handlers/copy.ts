import { TaskHandler, TaskHandlerInput, TaskHandlerOutput } from '../types';

interface CopyData {
  destinationPrefix: string;
  key: string;
}

export interface CopyHandlerInput extends TaskHandlerInput<CopyData> {}
export interface CopyHandlerOutput extends TaskHandlerOutput {}

export interface CopyHandler
  extends TaskHandler<CopyHandlerInput, CopyHandlerOutput> {}

export const copyHandler: CopyHandler = null as unknown as CopyHandler;
