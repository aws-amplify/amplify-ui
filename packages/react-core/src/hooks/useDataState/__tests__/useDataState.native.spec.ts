import { renderHook } from '@testing-library/react';

import useDataState from '../useDataState.native';

it('throws the expected error when called with a type not mapped to an action handler', () => {
  // turn off console.error logging for unhappy path test case
  jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => renderHook(() => useDataState())).toThrow(
    new Error('useDataState is not implemented for React Native')
  );
});
