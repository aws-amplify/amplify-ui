import {
  ButtonElementBase,
  LiElementBase,
  NavElementBase,
  OlElementBase,
  SectionElementBase,
  SpanElementBase,
  ViewElementBase,
  createElementsContext,
  ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface StorageBrowserElements
  extends Pick<
    ElementsBase,
    'Button' | 'Li' | 'Nav' | 'Ol' | 'Section' | 'Span' | 'View'
  > {}

const defaultValue: StorageBrowserElements = {
  Button: ButtonElementBase,
  Li: LiElementBase,
  Nav: NavElementBase,
  Ol: OlElementBase,
  Section: SectionElementBase,
  Span: SpanElementBase,
  View: ViewElementBase,
};

export const { ElementsProvider, useElement } =
  createElementsContext(defaultValue);
