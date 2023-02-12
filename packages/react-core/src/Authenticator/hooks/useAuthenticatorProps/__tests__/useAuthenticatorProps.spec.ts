import { renderHook } from '@testing-library/react-hooks';

import { COMPONENT_ROUTE_KEYS } from '../../constants';
import { mockUseAuthenticatorOutput } from '../../useAuthenticator/__mock__/useAuthenticator';
import { useAuthenticator } from '../../useAuthenticator';

import { useAuthenticatorProps } from '..';

jest.mock('../../useAuthenticator');

describe('useAuthenticatorProps', () => {
  it.each(COMPONENT_ROUTE_KEYS)(
    'returns the expected values for the %s route',
    (route) => {
      (useAuthenticator as jest.Mock).mockReturnValue({
        ...mockUseAuthenticatorOutput,
        route,
      });

      const { result } = renderHook(() => useAuthenticatorProps({ route }));
      expect(result.current).toMatchSnapshot();
    }
  );

  it('returns the expected values for a non-component route', () => {
    const route = 'idle';

    (useAuthenticator as jest.Mock).mockReturnValueOnce({ route });

    const { result } = renderHook(() => useAuthenticatorProps({ route }));
    expect(result.current).toStrictEqual({ route });
  });
});
