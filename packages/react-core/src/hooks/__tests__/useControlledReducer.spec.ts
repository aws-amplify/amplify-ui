import { act, renderHook } from '@testing-library/react';
import useControlledReducer from '../useControlledReducer';

type State = { value: string };
type Action = { type: 'update'; value: string } | { type: 'clear' };

const initialState: State = { value: '' };
const reducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'clear': {
      return initialState;
    }
    case 'update': {
      const { value } = action;
      return { value };
    }
  }
};

const onStateChange = jest.fn();

describe('useControlledReducer', () => {
  afterEach(() => {
    onStateChange.mockClear();
  });

  it('behaves as expected in uncontrolled mode', () => {
    const { result } = renderHook(() =>
      useControlledReducer(reducer, initialState)
    );

    const [state, dispatch] = result.current;

    expect(state).toBe(initialState);

    const updatedValue = { value: 'Hi!' };

    act(() => {
      dispatch({ ...updatedValue, type: 'update' });
    });

    const [updatedState] = result.current;

    expect(updatedState).toStrictEqual(updatedValue);

    act(() => {
      dispatch({ type: 'clear' });
    });

    const [clearedState] = result.current;

    expect(clearedState).toStrictEqual(initialState);
  });

  it('behaves as expected in controlled mode', () => {
    const initialControlledState = { value: 'controlled!' };

    const { rerender, result } = renderHook(
      (controlledState: State = initialControlledState) =>
        useControlledReducer(reducer, initialState, { controlledState })
    );

    const [state] = result.current;

    // provided value of `controlledState` overrides `initialState`
    expect(state).toBe(initialControlledState);

    const nextControlledState = { value: 'Hi!' };

    act(() => {
      rerender(nextControlledState);
    });

    const [nextState] = result.current;
    expect(nextState).toBe(nextControlledState);
  });

  it('calls `onStateChange` on state chaanges', () => {
    const { result } = renderHook(() =>
      useControlledReducer(reducer, initialState, { onStateChange })
    );

    const dispatch = result.current[1];

    // `onStateChange` should not be called on initial render`
    expect(onStateChange).not.toHaveBeenCalled();

    const updatedValue = { value: 'Hi!' };

    act(() => {
      dispatch({ ...updatedValue, type: 'update' });
    });

    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith(
      expect.objectContaining(updatedValue)
    );

    act(() => {
      dispatch({ type: 'clear' });
    });

    expect(onStateChange).toHaveBeenCalledTimes(2);
    expect(onStateChange).toHaveBeenCalledWith(
      expect.objectContaining(initialState)
    );
  });

  it('only calls `onStateChange` on state change', () => {
    const { rerender, result } = renderHook(
      (nextOnStateChange: () => void = onStateChange) =>
        useControlledReducer(reducer, initialState, {
          onStateChange: nextOnStateChange,
        })
    );

    const dispatch = result.current[1];

    // `onStateChange` should not be called on initial render`
    expect(onStateChange).not.toHaveBeenCalled();

    const updatedValue = { value: 'Hi!' };

    act(() => {
      dispatch({ ...updatedValue, type: 'update' });
    });

    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith(
      expect.objectContaining(updatedValue)
    );

    const nextOnStateChange = jest.fn();

    act(() => {
      rerender(nextOnStateChange);
    });

    // validate calls to `onStateChange` have not incremented
    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(nextOnStateChange).not.toHaveBeenCalled();

    const anotherUpdatedValue = { value: 'Bye!' };

    act(() => {
      dispatch({ ...anotherUpdatedValue, type: 'update' });
    });

    expect(nextOnStateChange).toHaveBeenCalledTimes(1);
    expect(nextOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining(anotherUpdatedValue)
    );
  });
});
