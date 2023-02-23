import { renderHook } from '@testing-library/react-hooks';
import { AuthenticatorRoute, capitalize } from '@aws-amplify/ui';

import { RenderNothing } from '../../../../components';
import { COMPONENT_ROUTE_KEYS } from '../../constants';
import { DEFAULTS, OVERRIDES } from '../__mock__/components';

import { UseAuthenticatorComponentsParams } from '../types';
import { useAuthenticatorComponents } from '..';

describe('useAuthenticatorComponents', () => {
  it.each(COMPONENT_ROUTE_KEYS)(
    'returns the expected value for the %s route',
    (route) => {
      const { result } = renderHook(() =>
        useAuthenticatorComponents({ defaults: DEFAULTS, route })
      );

      const expectedRouteComponent = DEFAULTS[capitalize(route)];
      expect(result.current).toStrictEqual(expectedRouteComponent);
    }
  );

  it('returns the expected value for a non-component route', () => {
    const { result } = renderHook(() =>
      useAuthenticatorComponents({ defaults: DEFAULTS, route: 'idle' })
    );
    expect(result.current).toStrictEqual(RenderNothing);
  });

  it('returns the expected override value for a component route', () => {
    const { ConfirmResetPassword } = OVERRIDES;

    const { result, rerender } = renderHook(
      (next: UseAuthenticatorComponentsParams<any>) =>
        useAuthenticatorComponents(next),
      {
        initialProps: {
          defaults: DEFAULTS,
          route: 'confirmResetPassword',
        },
      }
    );

    expect(result.current).toStrictEqual(DEFAULTS['ConfirmResetPassword']);
    expect(result.current).not.toStrictEqual(ConfirmResetPassword);

    rerender({
      defaults: DEFAULTS,
      overrides: { ConfirmResetPassword },
      route: 'confirmResetPassword',
    });

    expect(result.current).toStrictEqual(ConfirmResetPassword);
    expect(result.current).not.toStrictEqual(DEFAULTS['ConfirmResetPassword']);
  });

  it('returns the expected value when given an invalid route', () => {
    const { result } = renderHook(() =>
      useAuthenticatorComponents({
        defaults: DEFAULTS,
        route: 'invalid' as AuthenticatorRoute,
      })
    );
    expect(result.current).toStrictEqual(RenderNothing);
  });
});
