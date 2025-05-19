import { renderHook } from '@testing-library/react';
import { mockUseMachineOutput } from '../../Machine/__mock__/useMachine';
import * as MachineContext from '../../Machine';
import {
  ComponentRouteProvider,
  routeSelector,
  useComponentRoute,
} from '../ComponentRouteContext';

const useMachineSpy = jest.spyOn(MachineContext, 'useMachine');

describe('useComponentRoute', () => {
  beforeEach(() => {
    useMachineSpy.mockClear();
  });

  it('returns the expected values for a component route', () => {
    useMachineSpy.mockReturnValue({ ...mockUseMachineOutput, route: 'signIn' });

    const { result } = renderHook(() => useComponentRoute(), {
      wrapper: ComponentRouteProvider,
    });

    expect(result.current).toMatchSnapshot();
  });

  it('returns the expected values for a non-component route', () => {
    // default `route` is `idle`
    useMachineSpy.mockReturnValue(mockUseMachineOutput);

    const { result } = renderHook(() => useComponentRoute(), {
      wrapper: ComponentRouteProvider,
    });

    expect(result.current).toBeUndefined();
  });

  it('calls useMachine with routeSelector', () => {
    renderHook(() => useComponentRoute(), {
      wrapper: ComponentRouteProvider,
    });

    expect(useMachineSpy).toHaveBeenCalledTimes(1);
    expect(useMachineSpy).toHaveBeenCalledWith(routeSelector);
  });
});

describe('routeSelector', () => {
  it('returns the expected value', () => {
    expect(routeSelector(mockUseMachineOutput)).toStrictEqual(['idle']);
  });
});
