import { renderHook } from '@testing-library/react-hooks';
import { capitalize } from '@aws-amplify/ui';

import { RenderNothing } from '../../../../components';
import { COMPONENT_ROUTE_KEYS } from '../../constants';
import { DEFAULTS } from '../__mock__/components';

import { useAuthenticatorComponents } from '..';

describe('useAuthenticatorComponents', () => {
  it.each(COMPONENT_ROUTE_KEYS)(
    'returns the expected values for the %s route',
    (route) => {
      const { result } = renderHook(() =>
        useAuthenticatorComponents({ defaults: DEFAULTS, route })
      );

      const expectedRouteComponent = DEFAULTS[capitalize(route)];
      expect(result.current).toStrictEqual(expectedRouteComponent);
    }
  );

  it('returns the expected values for a non-component route', () => {
    const { result } = renderHook(() =>
      useAuthenticatorComponents({ defaults: DEFAULTS, route: 'idle' })
    );
    expect(result.current).toStrictEqual(RenderNothing);
  });
});
