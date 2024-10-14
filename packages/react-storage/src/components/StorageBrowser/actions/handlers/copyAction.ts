import { CopyInput } from '../../storage-internal';
import { TaskAction, TaskActionInput, TaskActionOutput } from '../types';

interface CopyData extends Pick<CopyInput, 'destination' | 'source'> {}

export interface CopyActionInput extends TaskActionInput<CopyData> {}
export interface CopyActionOutput extends TaskActionOutput {}

export interface CopyAction
  extends TaskAction<TaskActionInput, CopyActionOutput> {}

export const copyAction: CopyAction = null as unknown as CopyAction;
