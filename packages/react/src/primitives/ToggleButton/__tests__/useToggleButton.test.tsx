import { renderHook, act } from '@testing-library/react-hooks';

import { useToggleButton } from '../useToggleButton';

describe('useToggleButton test suite', () => {
  it('should return correct props for uncontrolled ToggleButton', () => {
    const { result } = renderHook(() =>
      useToggleButton({ defaultSelected: false })
    );
    expect(result.current.isPressed).toBeFalsy();
    expect(result.current.handleClick).toBeDefined();
  });

  it('should return correct props for controlled ToggleButton', () => {
    const { result } = renderHook(() =>
      useToggleButton({ isSelected: false, onChange: jest.fn() })
    );
    expect(result.current.isPressed).toBeFalsy();
    expect(result.current.handleClick).toBeDefined();
  });

  it('should provide correct handleOnClick for uncontrolled ToggleButton', () => {
    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
    const { result } = renderHook(() =>
      useToggleButton({ defaultSelected: false })
    );
    act(() => result.current.handleClick(mockEvent));
    expect(result.current.isPressed).toBeTruthy();
    act(() => result.current.handleClick(mockEvent));
    expect(result.current.isPressed).toBeFalsy();
  });

  it('should provide correct handleOnClick for controlled ToggleButton', () => {
    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useToggleButton({ isSelected: false, onChange })
    );
    act(() => result.current.handleClick(mockEvent));
    expect(onChange).toBeCalledTimes(1);
  });
});
