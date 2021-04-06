import * as React from "react";

import { AmplifyContext } from "../components/AmplifyProvider/AmplifyContext";
import * as primitives from "../primitives";

export function useAmplify(namespace) {
  const { components = {}, theme = {} } = React.useContext(AmplifyContext);

  const customComponents = Object.entries(components).reduce(
    (acc, [namespaced, Component]) => {
      // `Authenticator.SignIn.Button` => `Button`
      const name = namespaced.split(".").pop();

      // TODO `Authenticator.Button` should also override `Authenticator.SignIn.Button`? Maybe not...
      // But wait, `Input` should override `Authenticator.Input`!
      // if (namespaced === `${namespace}.${name}`) {
      // TODO Support decorator pattern (e.g. `acc[name] = Component(InputPrimitive)`)
      // TODO Pass in the previous component, not necessarily a primitive (e.g. SignIn?)
      acc[name] = Component;
      // }

      return acc;
    },
    {}
  );

  // TODO `theme` should override `style` or `className`?
  // TODO I'd rather this be something like `...getThemeProps` (https://github.com/downshift-js/downshift#getmenuprops)
  const styledComponents = Object.entries(theme).reduce(
    (acc, [namespaced, style]) => {
      // e.g. `Authenticator.Input` || `Input`
      // TODO Is this needed anymore? Maybe so for custom tailwind overrides!
      const name = namespaced.split(".").pop();
      const Primitive = primitives[name];

      if (!Primitive) {
        throw new Error(
          `Cannot set theme for unknown primitive ${JSON.stringify(name)}`
        );
      }

      acc[name] = (props) => <Primitive style={style} {...props} />;

      return acc;
    },
    {}
  );

  return {
    components: {
      ...primitives,
      // Override primitives with styled versions
      ...styledComponents,
      // Custom components always overrided styled versions
      ...customComponents,
    },

    theme,
  };
}
