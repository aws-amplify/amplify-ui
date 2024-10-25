import { Task } from '../tasks';
import { INITIAL_STATUS_COUNTS } from '../views/LocationActionView/constants';
import { CancelableTask } from '../views/LocationActionView/useHandleUpload';
import { TaskCounts } from './types';

export const getTaskCounts = (
  tasks: (Task | CancelableTask)[] = []
): TaskCounts =>
  tasks.reduce(
    (counts, { status }) => ({ ...counts, [status]: counts[status] + 1 }),
    { ...INITIAL_STATUS_COUNTS, TOTAL: tasks.length }
  );
