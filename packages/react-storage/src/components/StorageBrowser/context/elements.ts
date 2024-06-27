import {
  ButtonElementBase,
  ViewElementBase,
  createElementsContext,
  ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface StorageBrowserElements
  extends Pick<ElementsBase, 'Button' | 'View'> {}

const defaultValue: StorageBrowserElements = {
  Button: ButtonElementBase,
  View: ViewElementBase,
};

export const { ElementsProvider, useElement } =
  createElementsContext(defaultValue);
