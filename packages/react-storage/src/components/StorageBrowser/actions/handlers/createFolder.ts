import {
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskHandlerOptions,
} from './types';

export interface CreateFolderHandlerData extends TaskData {}
export interface CreateFolderHandlerOptions extends TaskHandlerOptions {
  preventOverwrite?: boolean;
}

export interface CreateFolderHandlerInput
  extends TaskHandlerInput<
    CreateFolderHandlerData,
    CreateFolderHandlerOptions
  > {
  destinationPrefix: string;
}

export interface CreateFolderHandlerOutput extends TaskHandlerOutput {}

export interface CreateFolderHandler
  extends TaskHandler<CreateFolderHandlerInput, CreateFolderHandlerOutput> {}

export const createFolderHandler: CreateFolderHandler =
  null as unknown as CreateFolderHandler;
