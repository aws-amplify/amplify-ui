import { renderHook, act } from '@testing-library/react-hooks';
import * as React from 'react';

import { useStepper } from '../useStepper';

describe('useStepper: ', () => {
  const label = 'test-hook';
  it('should return basic props correctly', () => {
    const { result } = renderHook(() =>
      useStepper({ label, step: 2, isDisabled: true })
    );
    expect(result.current.step).toBe(2);
    expect(result.current.handleDecrease).toBeDefined();
    expect(result.current.handleIncrease).toBeDefined();
    expect(result.current.handleOnBlur).toBeDefined();
    expect(result.current.handleOnChange).toBeDefined();
    expect(result.current.handleOnWheel).toBeDefined();
    expect(result.current.shouldDisableDecreaseButton).toBeTruthy();
    expect(result.current.shouldDisableIncreaseButton).toBeTruthy();
  });

  it('should return value and inputValue correctly(controlled)', () => {
    const { result } = renderHook(() => useStepper({ label, value: 10 }));
    expect(result.current.value).toBe(10);
    expect(result.current.inputValue).toBe(10);
  });

  it('should return value and inputValue correctly(uncontrolled)', () => {
    const { result } = renderHook(() =>
      useStepper({ label, defaultValue: 10 })
    );

    expect(result.current.value).toBe(10);
    expect(result.current.inputValue).toBe(10);

    const mockMouseEvent = {
      target: {},
    } as React.MouseEvent<HTMLButtonElement>;
    act(() => result.current.handleDecrease(mockMouseEvent));
    expect(result.current.value).toBe(9);
    expect(result.current.inputValue).toBe(9);

    act(() => result.current.handleIncrease(mockMouseEvent));
    expect(result.current.value).toBe(10);
    expect(result.current.inputValue).toBe(10);

    const mockChangeEvent = {
      target: { value: '-10' },
    } as React.ChangeEvent<HTMLInputElement>;
    act(() => result.current.handleOnChange(mockChangeEvent));
    expect(result.current.inputValue).toBe('-10');

    const mockFocusEvent = {
      target: { value: '-10' },
    } as React.FocusEvent<HTMLInputElement>;
    act(() => result.current.handleOnBlur(mockFocusEvent));
    // the real value will be updated when the input loses focus
    expect(result.current.value).toBe(-10);
  });
});
