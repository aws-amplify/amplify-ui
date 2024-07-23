import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';

export interface AIConversationElements {
  Button: typeof ButtonElement;
  Heading: typeof HeadingElement;
  Form: typeof FormElement;
  Icon: typeof IconElement;
  Image: typeof ImageElement;
  Input: typeof InputElement;
  ListItem: typeof ListItemElement;
  TextArea: typeof TextAreaElement;
  Span: typeof SpanElement;
  Text: typeof TextElement;
  UnorderedList: typeof UnorderedListElement;
  View: typeof ViewElement;
}

type TextAreaElementProps = 'name' | 'onChange' | 'placeholder';

export const TextAreaElement = defineBaseElement<
  'textarea',
  TextAreaElementProps
>({
  type: 'textarea',
  displayName: 'TextArea',
});

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

export const FormElement = defineBaseElement({
  type: 'form',
  displayName: 'Form',
});

export const HeadingElement = defineBaseElement({
  type: 'h2',
  displayName: 'Title',
});

export const IconElement = defineBaseElement<'svg', never, IconVariant>({
  type: 'svg',
  displayName: 'Icon',
});

export const ImageElement = defineBaseElement({
  type: 'img',
  displayName: 'Image',
});

export const InputElement = defineBaseElement<'input', 'type'>({
  type: 'input',
  displayName: 'Input',
});

type ButtonElementProps = 'disabled' | 'onClick' | 'type';
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

export const AIConversationElements: AIConversationElements = {
  Button: ButtonElement,
  Heading: HeadingElement,
  Form: FormElement,
  Icon: IconElement,
  Input: InputElement,
  Image: ImageElement,
  TextArea: TextAreaElement,
  ListItem: ListItemElement,
  Span: SpanElement,
  Text: TextElement,
  UnorderedList: UnorderedListElement,
  View: ViewElement,
};
