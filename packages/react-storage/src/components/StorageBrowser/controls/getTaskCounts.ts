import { Task } from '../tasks';
import { INITIAL_STATUS_COUNTS } from '../views/LocationActionView/constants';
import { TaskCounts } from './types';

export const getTaskCounts = (tasks: Task[] = []): TaskCounts =>
  tasks.reduce(
    (counts, { status }) => ({ ...counts, [status]: counts[status] + 1 }),
    { ...INITIAL_STATUS_COUNTS, TOTAL: tasks.length }
  );
