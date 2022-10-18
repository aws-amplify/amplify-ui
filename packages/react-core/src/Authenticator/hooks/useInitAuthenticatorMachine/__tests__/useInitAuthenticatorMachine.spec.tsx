import { renderHook } from '@testing-library/react-hooks';

import { useInitAuthenticatorMachine } from '..';
import { useAuthenticator, UseAuthenticator } from '../../useAuthenticator';

jest.mock('../../useAuthenticator');

const initializeMachine = jest.fn();

describe('useInitAuthenticatorMachine', () => {
  beforeEach(() => {
    initializeMachine.mockClear();
  });

  it('calls initializeMachine only once, even after subsequent rerenders', () => {
    const route = 'setup';
    let data = {};

    (useAuthenticator as jest.Mock).mockReturnValue({
      initializeMachine,
      route,
    } as unknown as UseAuthenticator);
    const { rerender } = renderHook(() => useInitAuthenticatorMachine(data));

    expect(initializeMachine).toHaveBeenCalledTimes(1);

    // change the input props of the hook to get the useEffect to run again
    data = { mutated: 'dataObject' };
    rerender();

    expect(initializeMachine).toHaveBeenCalledTimes(1);
  });

  it('does not run when the route !== "setup"', () => {
    const route = 'idle';
    const data = {};

    (useAuthenticator as jest.Mock).mockReturnValue({
      initializeMachine,
      route,
    } as unknown as UseAuthenticator);

    renderHook(() => useInitAuthenticatorMachine(data));

    expect(initializeMachine).toHaveBeenCalledTimes(0);
  });
});
