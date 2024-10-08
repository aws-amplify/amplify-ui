import { CopyWithPathInput } from 'aws-amplify/storage';
import { TaskAction, TaskActionInput, TaskActionOutput } from '../types';

interface CopyData extends Pick<CopyWithPathInput, 'destination' | 'source'> {}

export interface CopyActionInput extends TaskActionInput<CopyData> {}
export interface CopyActionOutput extends TaskActionOutput {}

export interface CopyAction
  extends TaskAction<TaskActionInput, CopyActionOutput> {}

export const copyAction: CopyAction = null as unknown as CopyAction;
