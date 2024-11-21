import React from 'react';
import { isComponent } from './utils';

/**
 * @internal @unstable
 */
export interface Controls
  extends Partial<Record<string, React.ComponentType>> {}

/**
 * @internal @unstable
 */
export const ControlsContext = React.createContext<Controls | undefined>(
  undefined
);

/**
 * @internal @unstable
 *
 * `ControlsProvider` provides the values contained in `ControlsContext`
 * to consumers. `ControlsContext` lookup is handled directly
 * by `Control` components returned by `withControls`.
 *
 * @example
 *
 * Add `ControlsContext` aware `Controls` components to a Connected
 * Component:
 *
 * ```tsx
 *  const DataList = withControls(function DataList<T>(data: T[]) {
 *    return <ScrollView>data.map(ListItem)</ScrollView>;
 *  }, 'DataList');
 *
 *  const DataListControl = () => {
 *    const data = useData();
 *    return <DataList data={data} />;
 *  }
 *
 *  interface ComponentControls {
 *    DataList: typeof DataListControl;
 *  }
 *
 *  function Component<T extends ComponentControls>(
 *    controls?: T
 *  ) {
 *    function ConnectedComponent({
 *      children,
 *    }: { children?: React.ReactNode }) {
 *      return (
 *        <ControlsProvider controls={controls}>
 *          {children}
 *        </ControlsProvider>
 *      );
 *    }
 *
 *    return ConnectedComponent;
 *  }
 * ```
 */
export function ControlsProvider<T extends Controls>({
  controls,
  ...props
}: {
  children?: React.ReactNode;
  controls?: T;
}): React.JSX.Element {
  return <ControlsContext.Provider {...props} value={controls} />;
}

/**
 * @internal @unstable
 *
 * @note reference `ControlsProvider` for example usage
 */
export function withControls<
  T extends React.ComponentType<any>,
  K extends keyof Controls,
>(Default: T, name: K): (props: React.ComponentProps<T>) => React.JSX.Element {
  const Component = (props: React.ComponentProps<T>) => {
    const Override = React.useContext(ControlsContext)?.[name];
    if (isComponent(Override)) {
      return <Override {...props} />;
    }
    return <Default {...props} />;
  };

  Component.displayName = name;
  return Component;
}
