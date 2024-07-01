import {
  ButtonElementBase,
  HeadingElementBase,
  LiElementBase,
  NavElementBase,
  OlElementBase,
  SectionElementBase,
  ViewElementBase,
  createElementsContext,
  ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface StorageBrowserElements
  extends Pick<
    ElementsBase,
    'Button' | 'Heading' | 'Li' | 'Nav' | 'Ol' | 'Section' | 'View'
  > {}

const defaultValue: StorageBrowserElements = {
  Button: ButtonElementBase,
  Heading: HeadingElementBase,
  Li: LiElementBase,
  Nav: NavElementBase,
  Ol: OlElementBase,
  Section: SectionElementBase,
  View: ViewElementBase,
};

export const { ElementsProvider, useElement } =
  createElementsContext(defaultValue);
