import { renderHook } from '@testing-library/react-hooks';

import { RenderNothing } from '../../../../components';
import { COMPONENT_ROUTE_KEYS } from '../../constants';
import { DEFAULTS } from '../../__mocks__/components';
import { mockUseAuthenticatorOutput } from '../../useAuthenticator/__mock__/useAuthenticator';
import { useAuthenticator } from '../../useAuthenticator';

import { useAuthenticatorRoute } from '..';

jest.mock('../../useAuthenticator');

describe('useAuthenticatorRoute', () => {
  it.each(COMPONENT_ROUTE_KEYS)(
    'returns the expected values for the %s route',
    (route) => {
      (useAuthenticator as jest.Mock).mockReturnValue({
        ...mockUseAuthenticatorOutput,
        route,
      });
      const { result } = renderHook(() =>
        useAuthenticatorRoute({ components: DEFAULTS })
      );
      expect(result.current).toMatchSnapshot();
    }
  );

  it('returns the expected values for a non-component route', () => {
    (useAuthenticator as jest.Mock).mockReturnValueOnce({ route: 'idle' });
    const { result } = renderHook(() =>
      useAuthenticatorRoute({ components: DEFAULTS })
    );
    expect(result.current).toStrictEqual({
      Component: RenderNothing,
      props: {},
    });
  });
});
