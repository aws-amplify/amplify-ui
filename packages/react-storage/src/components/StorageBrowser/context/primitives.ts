import {
  PrimitiveButton,
  PrimitiveView,
  createPrimitivesContext,
  DefaultPrimitives,
} from '@aws-amplify/ui-react/internal';

export interface StorageBrowserPrimitives
  extends Pick<DefaultPrimitives, 'Button' | 'View'> {}

const defaultValue: StorageBrowserPrimitives = {
  Button: PrimitiveButton,
  View: PrimitiveView,
};

export const { PrimitivesProvider, usePrimitive } =
  createPrimitivesContext(defaultValue);
