import { AuthenticatorRoute } from '@aws-amplify/ui';

import { COMPONENT_ROUTE_KEYS, COMPONENT_ROUTE_NAMES } from './constants';
import { AuthenticatorRouteComponentKey, Defaults, Overrides } from './types';

export const isComponentRouteKey = (
  route: AuthenticatorRoute
): route is AuthenticatorRouteComponentKey =>
  COMPONENT_ROUTE_KEYS.some((componentRoute) => componentRoute === route);

export function resolveAuthenticatorComponents<FieldType>(
  defaults: Defaults<FieldType>,
  overrides?: Overrides<FieldType>
): Defaults<FieldType> {
  if (!overrides) {
    return defaults;
  }

  return COMPONENT_ROUTE_NAMES.reduce((components, route) => {
    const Default = defaults[route];
    const Override = overrides[route];

    if (typeof Override !== 'function') {
      return { ...components, [route]: Default };
    }

    const { Footer, FormFields, Header } = Default;

    // cast to allow assigning of component slots
    const Component = Override as typeof Default;

    Component.Footer = Footer;
    Component.FormFields = FormFields;
    Component.Header = Header;

    return { ...components, [route]: Component };
  }, {} as Defaults<FieldType>);
}
