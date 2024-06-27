import {
  PrimitiveButton as ButtonElementBase,
  PrimitiveView as ViewPrimitiveBase,
  createPrimitivesContext as createElementsContext,
  DefaultPrimitives as ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface StorageBrowserElements
  extends Pick<ElementsBase, 'Button' | 'View'> {}

const defaultValue: StorageBrowserElements = {
  Button: ButtonElementBase,
  View: ViewPrimitiveBase,
};

export const {
  PrimitivesProvider: ElementsProvider,
  usePrimitive: useElement,
} = createElementsContext(defaultValue);
