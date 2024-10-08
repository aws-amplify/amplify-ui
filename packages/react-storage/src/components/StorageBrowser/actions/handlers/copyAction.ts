import { CopyWithPathInput } from 'aws-amplify/storage';
import {
  DataTaskAction,
  DataTaskActionInput,
  DataTaskActionOutput,
} from '../types';

interface CopyData extends Pick<CopyWithPathInput, 'destination' | 'source'> {}

export interface CopyActionInput extends DataTaskActionInput<CopyData> {}
export interface CopyActionOutput extends DataTaskActionOutput {}

export interface CopyAction extends DataTaskAction<DataTaskActionInput> {}

export const copyAction: CopyAction = null as unknown as CopyAction;
