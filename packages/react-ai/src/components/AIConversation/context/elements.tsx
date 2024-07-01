import {
  ButtonElementBase,
  ViewElementBase,
  ParagraphElementBase,
  createElementsContext,
  ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface AIConversationElements
  extends Pick<ElementsBase, 'Button' | 'View' | 'Text'> {}

const defaultValue: AIConversationElements = {
  Button: ButtonElementBase,
  View: ViewElementBase,
  Text: ParagraphElementBase,
};

export const { ElementsProvider, useElement } =
  createElementsContext(defaultValue);
