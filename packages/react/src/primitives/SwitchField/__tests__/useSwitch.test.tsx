import { renderHook, act } from '@testing-library/react-hooks';
import * as React from 'react';

import { useSwitch } from '../useSwitch';

describe('useSwitch: ', () => {
  it('should return basic props correctly', () => {
    const { result } = renderHook(() => useSwitch({ defaultChecked: true }));
    expect(result.current.changeHandler).toBeDefined();
    expect(result.current.isFocused).toBeDefined();
    expect(result.current.isFocused).toBe(false);
    expect(result.current.isOn).toBeDefined();
    expect(result.current.setIsFocused).toBeDefined();
  });

  it('should handle focus state', () => {
    const { result } = renderHook(() => useSwitch({}));
    expect(result.current.isFocused).toBe(false);
    act(() => result.current.setIsFocused(true));
    expect(result.current.isFocused).toBe(true);
  });

  it('should run onChange function', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useSwitch({ onChange, defaultChecked: false })
    );

    const mockChangeEvent = {
      target: { checked: true },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => result.current.changeHandler(mockChangeEvent));
    expect(onChange).toBeCalledTimes(1);
    expect(result.current.isOn).toBe(true);
  });

  describe('uncontrolled', () => {
    it('should return true if defaultChecked is true', () => {
      const { result } = renderHook(() => useSwitch({ defaultChecked: true }));
      expect(result.current.isOn).toEqual(true);
    });

    it('should return false if defaultChecked is false', () => {
      const { result } = renderHook(() => useSwitch({ defaultChecked: false }));
      expect(result.current.isOn).toEqual(false);
    });

    it('should handle input events', () => {
      const { result } = renderHook(() => useSwitch({ defaultChecked: false }));

      const mockChangeEvent = {
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => result.current.changeHandler(mockChangeEvent));
      expect(result.current.isOn).toBe(true);
    });
  });

  describe('controlled', () => {
    it('should return true if isChecked is true', () => {
      const { result } = renderHook(() => useSwitch({ isChecked: true }));
      expect(result.current.isOn).toEqual(true);
    });

    it('should return false if isChecked is false', () => {
      const { result } = renderHook(() => useSwitch({ isChecked: false }));
      expect(result.current.isOn).toEqual(false);
    });
  });
});
