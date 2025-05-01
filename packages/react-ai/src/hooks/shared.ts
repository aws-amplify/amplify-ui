import type { GraphQLFormattedError } from '../types';

export interface AiClientState<T> {
  data: T;
  hasError: boolean;
  isLoading: boolean;
  /**
   * @deprecated will be removed in a future major version. Superseded by `errors`
   * @description errors returned from the websocket connection
   */
  messages?: GraphQLFormattedError[];
  /**
   * @description errors returned from the websocket connection
   */
  errors?: GraphQLFormattedError[];
}

export interface AiClientResponse<T> {
  data: T | null;
  errors?: GraphQLFormattedError[];
}

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
