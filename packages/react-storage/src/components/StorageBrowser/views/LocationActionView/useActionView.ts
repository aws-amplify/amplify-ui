import { INITIAL_STATUS_COUNTS } from '../../tasks';
import { ActionViewState } from './types';
import { DEFAULT_STATE } from '../../providers/store/location/context';

export function useActionView(): ActionViewState {
  return {
    isProcessing: false,
    isProcessingComplete: false,
    location: DEFAULT_STATE,
    statusCounts: INITIAL_STATUS_COUNTS,
    tasks: [],
    onActionExit: () => null,
    onActionStart: () => null,
    onActionCancel: () => null,
    onTaskCancel: () => null,
  };
}
