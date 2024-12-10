import { StorageBrowserIconType } from '../../context/elements';
import { TaskStatus } from '../../tasks';

export const getActionIcon = (
  status: TaskStatus | 'CANCELED'
): StorageBrowserIconType => {
  switch (status) {
    case 'PENDING': {
      return 'action-progress';
    }
    case 'COMPLETE': {
      return 'action-success';
    }
    case 'FAILED': {
      return 'action-error';
    }
    case 'OVERWRITE_PREVENTED': {
      return 'action-info';
    }
    case 'CANCELED': {
      return 'action-canceled';
    }
    case 'QUEUED':
    default: {
      return 'action-queued';
    }
  }
};
