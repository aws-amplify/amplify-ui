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
