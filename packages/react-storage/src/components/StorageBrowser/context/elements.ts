import {
  ButtonElementBase,
  LiElementBase,
  NavElementBase,
  SectionElementBase,
  ViewElementBase,
  createElementsContext,
  ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface StorageBrowserElements
  extends Pick<ElementsBase, 'Button' | 'Li' | 'Nav' | 'Section' | 'View'> {}

const defaultValue: StorageBrowserElements = {
  Button: ButtonElementBase,
  Li: LiElementBase,
  Nav: NavElementBase,
  Section: SectionElementBase,
  View: ViewElementBase,
};

export const { ElementsProvider, useElement } =
  createElementsContext(defaultValue);
