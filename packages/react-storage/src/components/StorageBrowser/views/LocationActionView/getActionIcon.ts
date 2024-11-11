import { IconVariant } from '../../context/elements';
import { TaskStatus } from '../../tasks';

export const getActionIcon = (status: TaskStatus | 'CANCELED'): IconVariant => {
  switch (status) {
    case 'PENDING': {
      return 'action-progress';
    }
    case 'COMPLETE':
    case 'OVERWRITE_PREVENTED': {
      return 'action-success';
    }
    case 'FAILED': {
      return 'action-error';
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
