import { COMPONENT_ROUTE_NAMES } from '../constants';
import { RouteComponentsDefaults, RouteComponentsOverrides } from './types';

export function mergeComponents<Defaults extends RouteComponentsDefaults<any>>(
  defaults: Defaults,
  overrides?: RouteComponentsOverrides<any>
): Defaults {
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
  }, {} as Defaults);
}
