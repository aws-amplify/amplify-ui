import { INITIAL_STATUS_COUNTS } from '../../tasks';
import { ActionViewState } from './types';

export function useActionView(): ActionViewState {
  return {
    isProcessing: false,
    isProcessingComplete: false,
    onExit: () => null,
    onActionStart: () => null,
    onActionCancel: () => null,
    tasks: [],
    statusCounts: INITIAL_STATUS_COUNTS,
  };
}
