import React from 'react';

type TaskStatus = 'INITIAL' | 'QUEUED' | 'IN_PROGRESS' | 'SUCCESS' | 'ERROR';

/**
 * Base `task`
 */
interface Task {
  key: string;
  message: string | undefined;
  status: TaskStatus;
}

interface CancelableTask extends Omit<Task, 'status'> {
  cancel: (() => void) | undefined;
  status: TaskStatus | 'CANCELED';
}

type SummaryAction =
  | { type: 'START' }
  | { type: 'CANCEL' }
  | { type: 'DONE' }
  | { type: 'REMOVE_TASK'; key: string }
  | { type: 'REMOVE_ALL_TASKS' };

export interface SummaryState {
  destination: string | undefined;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
  tasks: Task[] | CancelableTask[] | undefined;
}

export type SummaryStateContext = [
  state: SummaryState,
  handleUpdateState: (action: SummaryAction) => void,
];

const INITIAL_STATE: SummaryState = {
  destination: '',
  status: 'NOT_STARTED',
  tasks: undefined,
};

export function summaryReducer(
  state: SummaryState,
  _action: SummaryAction
): SummaryState {
  return state;
}

export const SummaryContext = React.createContext<
  SummaryStateContext | undefined
>(undefined);

export function SummaryProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(summaryReducer, INITIAL_STATE);

  return (
    <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
  );
}
