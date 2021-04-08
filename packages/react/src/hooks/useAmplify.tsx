import { useContext } from "react";

import { AmplifyContext } from "../components/AmplifyProvider/AmplifyContext";
import * as primitives from "../primitives";

export function useAmplify(namespace) {
  const { components = {}, theme } = useContext(AmplifyContext);

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

  // const styledComponents = Object.entries(components).reduce(
  //   (acc, [name, Component]) => {
  //     // e.g. `Authenticator.Input` || `Input`
  //     // TODO Is this needed anymore? Maybe so for custom tailwind overrides!
  //     const className =
  //       custom.theme?.[`${namespace}.${name}`] || custom.theme?.[name];
  //     const namespaced = `${namespace}.${name}`;

  //     acc[name] =
  //       custom.components?.[namespaced] ||
  //       custom.components?.[name] ||
  //       Component;

  //     return acc;
  //   },
  //   {}
  // );

  return {
    components: {
      ...primitives,
      ...customComponents,
    },

    theme,
  };
}
