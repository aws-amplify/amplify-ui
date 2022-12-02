import { renderHook } from '@testing-library/react-hooks';

import { useAuthenticator, UseAuthenticator } from '../../useAuthenticator';
import { mockUseAuthenticatorOutput } from '../../useAuthenticator/__mock__/useAuthenticator';

import { routeSelector } from '../useAuthenticatorInitMachine';
import { useAuthenticatorInitMachine } from '..';

jest.mock('../../useAuthenticator');

const initializeMachine = jest.fn();

describe('useAuthenticatorInitMachine', () => {
  beforeEach(() => {
    initializeMachine.mockClear();
  });

  it('calls initializeMachine only once, even after subsequent rerenders', () => {
    const route = 'setup';
    const initialData = {};
    const modifiedData = { mutated: 'dataObject' };

    (useAuthenticator as jest.Mock).mockReturnValue({
      initializeMachine,
      route,
    } as unknown as UseAuthenticator);

    const { rerender } = renderHook(
      ({ data }) => useAuthenticatorInitMachine(data),
      { initialProps: { data: initialData } }
    );

    expect(initializeMachine).toHaveBeenCalledTimes(1);

    // change the input props of the hook to get the useEffect to run again
    rerender({ data: modifiedData });

    expect(initializeMachine).toHaveBeenCalledTimes(1);
  });

  it('does not call initializeMachine when the route !== "setup"', () => {
    const route = 'idle';
    const data = {};

    (useAuthenticator as jest.Mock).mockReturnValue({
      initializeMachine,
      route,
    } as unknown as UseAuthenticator);

    renderHook(() => useAuthenticatorInitMachine(data));

    expect(initializeMachine).toHaveBeenCalledTimes(0);
  });
});

describe('routeSelector', () => {
  it('only selects the value of route', () => {
    const route = 'idle' as UseAuthenticator['route'];
    const machineContext = { ...mockUseAuthenticatorOutput, route };

    const output = routeSelector(machineContext);
    expect(output).toStrictEqual([route]);
  });
});
