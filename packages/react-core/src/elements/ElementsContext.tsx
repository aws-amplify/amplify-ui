import React from 'react';
import type { ElementDisplayName } from './types';

/**
 * @internal @unstable
 */
export interface Elements
  extends Partial<Record<ElementDisplayName, React.ComponentType>> {}

export const ElementsContext = React.createContext<Elements | undefined>(
  undefined
);

/**
 * @internal @unstable
 *
 * `ElementsProvider` provides the values contained in `ElementsContext`
 * to its `children`. `ElementsContext` lookup is handled directly
 * by `BaseElement`components returned by `defineBaseElement` and
 * `defineBaseElementWithRef`.
 *
 * @example
 *
 * Add `ElementsContext` aware `BaseElement` components to a Connected
 * Component
 *
 * ```tsx
 * // `BaseElement`, renders custom or default element defintion
 * const ViewElement = defineBaseElementWithRef({
 *   displayName: "View",
 *   type: "div",
 * });
 *
 * // `BaseElement` components to be provided through `ElementsContext`
 * interface ConnectedComponentElements {
 *   View: typeof ViewElement;
 * }
 *
 * function createConnectedComponent<T extends ConnectedComponentElements>(
 *   elements?: T
 * ) {
 *   const Provider = ({ children }: { children?: React.ReactNode }) => (
 *     <ElementsProvider elements={elements}>
 *       <Children />
 *     </ElementsProvider>
 *   );
 *
 *   function ConnectedComponent() {
 *     return (
 *       <Provider>
 *         <ConnectedComponentContent />
 *       </Provider>
 *     );
 *   }
 *
 *   ConnectedComponent.Provider = Provider;
 *
 *   return ConnectedComponent;
 * }
 * ```
 */
export function ElementsProvider<T extends Elements>({
  elements,
  ...props
}: {
  children?: React.ReactNode;
  elements?: T;
}): React.JSX.Element {
  return <ElementsContext.Provider {...props} value={elements} />;
}
