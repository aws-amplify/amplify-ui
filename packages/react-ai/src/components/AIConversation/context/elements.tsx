import React from 'react';
import {
  ButtonElementBase,
  ViewElementBase,
  createElementsContext,
  ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface AIConversationElements
  extends Pick<ElementsBase, 'Button' | 'View' | 'Text'> {}

export const ParagraphElement: ElementsBase['Text'] = React.forwardRef(
  (props, ref) => <p {...props} ref={ref} />
);
ParagraphElement.displayName = 'Paragraph';

const defaultValue: AIConversationElements = {
  Button: ButtonElementBase,
  View: ViewElementBase,
  Text: ParagraphElement,
};

export const { ElementsProvider, useElement } =
  createElementsContext(defaultValue);
