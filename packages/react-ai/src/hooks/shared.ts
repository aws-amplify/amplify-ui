import { DataState } from '@aws-amplify/ui-react-core';

interface GraphQLFormattedError {
  readonly message: string;
  readonly errorType: string;
  readonly errorInfo: null | {
    [key: string]: unknown;
  };
}

export type DataClientState<T> = Omit<DataState<T>, 'message'> & {
  messages?: GraphQLFormattedError[];
};

export type DataClientResponse<T> = {
  data: T | null;
  errors?: GraphQLFormattedError[];
};

// default state
export const INITIAL_STATE = {
  hasError: false,
  isLoading: false,
  messages: undefined,
};
export const LOADING_STATE = {
  hasError: false,
  isLoading: true,
  messages: undefined,
};
export const ERROR_STATE = { hasError: true, isLoading: false };
