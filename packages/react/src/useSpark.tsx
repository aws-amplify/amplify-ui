import { useContext } from "react";

import { SparkContext } from "./SparkContext";
import * as primitives from "./primitives";

export function useSpark(namespace) {
  const custom = useContext(SparkContext);

  // Ensure classNames exists when value={ components } only
  const classNames = {
    ...custom.classNames,
  };
  const components = {
    // Base, stub components that are required to exist to render
    ...primitives,
    ...custom.components,
  };

  const styledComponents = Object.entries(components).reduce(
    (acc, [name, Component]) => {
      // e.g. `Authenticator.Input` || `Input`
      const className =
        custom.classNames[`${namespace}.${name}`] || custom.classNames[name];

      acc[name] = className
        ? function Wrapped(props) {
            return <Component className={className} {...props} />;
          }
        : Component;

      return acc;
    },
    {}
  );

  return {
    classNames,

    components: {
      ...components,
      ...styledComponents,

      ...primitives,

      // Contextual overrides
      ...styledComponents,
    },
  };
}
