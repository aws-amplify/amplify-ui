import { INITIAL_STATUS_COUNTS } from '../views/LocationActionView/constants';

import { Task } from '../tasks';
import { TaskCounts } from './types';

export const getTaskCounts = <T>(tasks: Task<T>[] = []): TaskCounts =>
  tasks.reduce(
    (counts, { status }) => ({ ...counts, [status]: counts[status] + 1 }),
    { ...INITIAL_STATUS_COUNTS, TOTAL: tasks.length }
  );
