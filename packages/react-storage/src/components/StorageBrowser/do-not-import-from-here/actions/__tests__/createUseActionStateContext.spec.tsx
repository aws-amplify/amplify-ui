import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { createActionStateContext } from '../createActionStateContext';
import { AsyncDataAction } from '@aws-amplify/ui-react-core';

const actionOne: AsyncDataAction = jest.fn(
  (
    _: { value: string | undefined },
    { inputValue }: { inputValue: string }
  ): Promise<{ value: string | undefined }> =>
    Promise.resolve({ value: inputValue })
);

const actionTwo: AsyncDataAction = jest.fn(
  (
    _: { anotherValue: boolean },
    { inputValue }: { inputValue: boolean }
  ): Promise<{ anotherValue: boolean }> =>
    Promise.resolve({ anotherValue: inputValue })
);

const actions = { actionOne, actionTwo };
const initialValue = {
  actionOne: { value: undefined },
  actionTwo: { anotherValue: false },
};

describe('createActionStateContext', () => {
  it('creates a composed `Provider`', async () => {
    const [Provider, useAction] = createActionStateContext(
      actions,
      'context error'
    );
    const Wrapper = (props: { children?: React.ReactNode }) => (
      <Provider {...props} initialValue={initialValue} />
    );

    const { result, waitForNextUpdate } = renderHook(
      () => useAction({ type: 'actionOne' }),
      {
        wrapper: Wrapper,
      }
    );

    const [initialState, handleAction] = result.current;
    expect(initialState.isLoading).toBe(false);
    expect(initialState.hasError).toBe(false);
    expect(initialState.message).toBeUndefined();
    expect(initialState.data).toBe(initialValue['actionOne']);

    act(() => {
      handleAction({ inputValue: 'new value' });
    });

    const [loadingState] = result.current;
    expect(loadingState.isLoading).toBe(true);
    expect(loadingState.hasError).toBe(false);
    expect(loadingState.message).toBeUndefined();
    expect(loadingState.data).toBe(initialValue['actionOne']);

    await waitForNextUpdate();

    const [doneState] = result.current;
    expect(doneState.isLoading).toBe(false);
    expect(doneState.hasError).toBe(false);
    expect(doneState.message).toBeUndefined();
    expect(doneState.data).toStrictEqual({ value: 'new value' });
  });

  it('`useAction` throws when used outside a `Provider`', () => {
    const [, useAction] = createActionStateContext(actions, 'context error');

    const { result } = renderHook(() => useAction({ type: 'actionOne' }));

    expect(result.error?.message).toBe('context error');
  });
});
