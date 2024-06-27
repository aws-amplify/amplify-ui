import React from 'react';
import { ElementDisplayName } from './types';

export interface Elements
  extends Partial<Record<ElementDisplayName, React.ComponentType>> {}

const ElementsContext = React.createContext<Elements | undefined>(undefined);

/**
 * `ElementsProvider` and its coresponding `useElement` hook provide
 * access to the values of the nearest ancestral `ElementsContext`
 * value.
 *
 * In most use cases, there is no need to directly invoke `useElement`;
 * `ElementsContext` lookup is handled directly by `BaseElement`
 * components returned by `defineBaseElement`.
 *
 * @example
 *
 * Add `EleemntxContext` aware `BaseElement` components to a
 * Connectred Component
 *
 * ```tsx
 * // `BaseElement`, renders custom or default element defintion
 * const ViewElement = defineBaseElement({
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

export const useElement = <T extends keyof Elements>(
  name: T
): Elements[T] | undefined => {
  const context = React.useContext(ElementsContext);
  return context?.[name];
};
