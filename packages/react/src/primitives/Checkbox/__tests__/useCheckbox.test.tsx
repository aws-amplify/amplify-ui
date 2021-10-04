import { ChangeEvent } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useCheckbox } from '../useCheckbox';

describe('useCheckbox test suite', () => {
  it('should return correct props with initial values', () => {
    const { result } = renderHook(() => useCheckbox(false, jest.fn()));

    expect(result.current.dataChecked).toBeFalsy();
    expect(result.current.dataFocus).toBeFalsy();
    expect(result.current.onBlur).toBeDefined();
    expect(result.current.onChange).toBeDefined();
    expect(result.current.onFocus).toBeDefined();
  });
  it('should initialize callback functions with appropriate functionality', () => {
    const mockEvent = {
      target: { checked: true },
    } as ChangeEvent<HTMLInputElement>;
    const { result } = renderHook(() => useCheckbox(false, jest.fn()));

    act(() => result.current.onChange(mockEvent));
    expect(result.current.dataChecked).toBeTruthy();

    act(() => result.current.onFocus());
    expect(result.current.dataFocus).toBeTruthy();

    act(() => result.current.onBlur());
    expect(result.current.dataFocus).toBeFalsy();
  });
});
