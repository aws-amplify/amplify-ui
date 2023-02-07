import { renderHook, act } from '@testing-library/react-hooks';
import * as React from 'react';

import { useStepper } from '../useStepper';

describe('useStepper:', () => {
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

  it('should handle onIncrease', () => {
    const onIncrease = jest.fn();
    const { result } = renderHook(() =>
      useStepper({
        label,
        value: 10,
        onIncrease,
      })
    );
    const mockMouseEvent = {
      target: {},
    } as React.MouseEvent<HTMLButtonElement>;
    act(() => result.current.handleIncrease(mockMouseEvent));
    expect(onIncrease).toBeCalledTimes(1);
  });

  it('should handle onDecrease', () => {
    const onDecrease = jest.fn();
    const { result } = renderHook(() =>
      useStepper({
        label,
        value: 10,
        onDecrease,
      })
    );
    const mockMouseEvent = {
      target: {},
    } as React.MouseEvent<HTMLButtonElement>;
    act(() => result.current.handleDecrease(mockMouseEvent));
    expect(onDecrease).toBeCalledTimes(1);
  });

  it('should return a valid value if above max', () => {
    const { result } = renderHook(() =>
      useStepper({ label, value: 10, min: 0, max: 5 })
    );
    expect(result.current.value).toEqual(5);
  });

  it('should return a valid value if below min', () => {
    const { result } = renderHook(() =>
      useStepper({ label, value: 1, min: 5, max: 10 })
    );
    expect(result.current.value).toEqual(5);
  });

  it('should call the onChange prop when provided', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useStepper({
        label,
        value: 10,
        onChange,
      })
    );
    const mockMouseEvent = {
      target: {},
    } as React.ChangeEvent<HTMLInputElement>;
    act(() => result.current.handleOnChange(mockMouseEvent));
    expect(onChange).toBeCalledTimes(1);
  });
});
