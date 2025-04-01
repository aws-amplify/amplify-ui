import { DataState } from '@aws-amplify/ui-react-core';
import { GraphQLFormattedError } from '../types';

export type DataClientState<T> = Omit<DataState<T>, 'message'> & {
  /**
   * @deprecated - Please use `errors` instead
   */
  messages?: GraphQLFormattedError[];
  errors?: GraphQLFormattedError[];
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
