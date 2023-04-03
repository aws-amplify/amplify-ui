import { renderHook, act } from '@testing-library/react-hooks';

import { useToggleButton } from '../useToggleButton';

describe('useToggleButton:', () => {
  it('should return correct props for uncontrolled ToggleButton', () => {
    const { result } = renderHook(() =>
      useToggleButton({ defaultPressed: false })
    );
    expect(result.current.isPressed).toBeFalsy();
    expect(result.current.handleClick).toBeDefined();
  });

  it('should return correct props for controlled ToggleButton', () => {
    const { result } = renderHook(() =>
      useToggleButton({ isPressed: false, onChange: jest.fn() })
    );
    expect(result.current.isPressed).toBeFalsy();
    expect(result.current.handleClick).toBeDefined();
  });

  it('should provide working handleOnClick for uncontrolled ToggleButton', () => {
    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
    const { result } = renderHook(() =>
      useToggleButton({ defaultPressed: false })
    );
    act(() => result.current.handleClick(mockEvent));
    expect(result.current.isPressed).toBeTruthy();
    act(() => result.current.handleClick(mockEvent));
    expect(result.current.isPressed).toBeFalsy();
  });

  it('should provide working handleOnClick for controlled ToggleButton', () => {
    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useToggleButton({ isPressed: false, onChange })
    );
    act(() => result.current.handleClick(mockEvent));
    expect(onChange).toBeCalledTimes(1);
  });
});
