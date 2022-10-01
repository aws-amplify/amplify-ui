import { COMPONENT_ROUTE_KEYS } from '../constants';
import { AuthenticatorRouteComponentKey } from '../types';
import { isComponentRouteKey } from '../utils';

describe('isComponentRouteKey', () => {
  it.each(COMPONENT_ROUTE_KEYS)('returns true for a %s value', (route) => {
    const output = isComponentRouteKey(route);
    expect(output).toBe(true);
  });

  it('returns false for a non-component route key value', () => {
    const output = isComponentRouteKey(
      'route' as AuthenticatorRouteComponentKey
    );

    expect(output).toBe(false);
  });
});
