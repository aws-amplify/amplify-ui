import {
  ButtonElementBase,
  IconElementBase,
  ImageElementBase,
  ViewElementBase,
  ParagraphElementBase,
  createElementsContext,
  ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface AIConversationElements
  extends Pick<ElementsBase, 'Button' | 'View' | 'Text' | 'Image' | 'Icon'> {}

const defaultValue: AIConversationElements = {
  Button: ButtonElementBase,
  Icon: IconElementBase,
  Image: ImageElementBase,
  View: ViewElementBase,
  Text: ParagraphElementBase,
};

export const { ElementsProvider, useElement } =
  createElementsContext(defaultValue);
