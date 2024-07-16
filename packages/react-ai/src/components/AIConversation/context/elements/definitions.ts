import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';

export interface AIConversationElements {
  Button: typeof ButtonElement;
  Heading: typeof HeadingElement;
  Icon: typeof IconElement;
  Input: typeof InputElement;
  ListItem: typeof ListItemElement;
  Span: typeof SpanElement;
  Text: typeof TextElement;
  TextArea: typeof TextAreaElement;
  UnorderedList: typeof UnorderedListElement;
  View: typeof ViewElement;
}

type IconVariant = 'send-message' | 'attach';

export const TextElement = defineBaseElement({
  type: 'p',
  displayName: 'Text',
});

export const UnorderedListElement = defineBaseElement({
  type: 'ul',
  displayName: 'UnorderedList',
});

export const ListItemElement = defineBaseElement({
  type: 'li',
  displayName: 'ListItem',
});

export const HeadingElement = defineBaseElement({
  type: 'h2',
  displayName: 'Title',
});

export const IconElement = defineBaseElement<'svg', never, IconVariant>({
  type: 'svg',
  displayName: 'Icon',
});

export const InputElement = defineBaseElement<'input', 'type'>({
  type: 'input',
  displayName: 'Input',
});

type ButtonElementProps = 'onClick' | 'type';
type ButtonElementVariant = 'send-message' | 'attach';

export const ButtonElement = defineBaseElement<
  'button',
  ButtonElementProps,
  ButtonElementVariant
>({ type: 'button', displayName: 'Button' });

export const ViewElement = defineBaseElement({
  type: 'div',
  displayName: 'View',
});

export const SpanElement = defineBaseElement({
  type: 'span',
  displayName: 'Span',
});

export const TextAreaElement = defineBaseElement({
  type: 'textarea',
  displayName: 'TextArea',
});

export const AIConversationElements: AIConversationElements = {
  Button: ButtonElement,
  Heading: HeadingElement,
  Icon: IconElement,
  Input: InputElement,
  ListItem: ListItemElement,
  Span: SpanElement,
  Text: TextElement,
  TextArea: TextAreaElement,
  UnorderedList: UnorderedListElement,
  View: ViewElement,
};
