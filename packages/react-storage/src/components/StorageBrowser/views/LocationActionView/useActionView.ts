import { ActionViewState } from './types';

export function useActionView(): ActionViewState {
  return {
    disableCancel: false,
    disableClose: false,
    disableStart: false,
    onExit: () => null,
    onActionStart: () => null,
    onActionCancel: () => null,
    tasks: [],
    taskCounts: {
      CANCELED: 0,
      COMPLETE: 0,
      FAILED: 0,
      INITIAL: 0,
      OVERWRITE_PREVENTED: 0,
      PENDING: 0,
      QUEUED: 0,
      TOTAL: 0,
    },
  };
}
