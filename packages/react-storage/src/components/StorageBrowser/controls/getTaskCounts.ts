import { INITIAL_STATUS_COUNTS } from '../views/LocationActionView/constants';
import { CancelableTask } from '../views/LocationActionView/useHandleUpload';

export const getTaskCounts = (
  tasks: CancelableTask[] = []
): typeof INITIAL_STATUS_COUNTS =>
  tasks.reduce(
    (counts, { status }) => ({ ...counts, [status]: counts[status] + 1 }),
    { ...INITIAL_STATUS_COUNTS, TOTAL: tasks.length }
  );
