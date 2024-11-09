import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';
import { IconElement } from './IconElement';

export interface AIConversationElements {
  Button: typeof ButtonElement;
  Heading: typeof HeadingElement;
  Icon: typeof IconElement;
  Image: typeof ImageElement;
  Input: typeof InputElement;
  Label: typeof LabelElement;
  ListItem: typeof ListItemElement;
  Span: typeof SpanElement;
  Text: typeof TextElement;
  TextArea: typeof TextAreaElement;
  UnorderedList: typeof UnorderedListElement;
  View: typeof ViewElement;
}

export const LabelElement = defineBaseElement<'label', 'htmlFor'>({
  type: 'label',
  displayName: 'Label',
});

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

export type IconElementProps = React.ComponentProps<typeof IconElement>;

type ImageElementProps = 'src' | 'alt';
export const ImageElement = defineBaseElement<'img', ImageElementProps>({
  type: 'img',
  displayName: 'Image',
});

export const InputElement = defineBaseElement<'input', 'type'>({
  type: 'input',
  displayName: 'Input',
});

type ButtonElementProps = 'disabled' | 'onClick' | 'type' | 'tabIndex';
type ButtonElementVariant = 'attach' | 'remove' | 'send-message';

export const ButtonElement = defineBaseElement<
  'button',
  ButtonElementProps,
  ButtonElementVariant
>({ type: 'button', displayName: 'Button' });

type ViewElementProps = 'onFocus' | 'tabIndex' | 'onKeyDown';

export const ViewElement = defineBaseElement<'div', ViewElementProps>({
  type: 'div',
  displayName: 'View',
});

export const SpanElement = defineBaseElement({
  type: 'span',
  displayName: 'Span',
});

type TextAreaElementProps =
  | 'id'
  | 'name'
  | 'onChange'
  | 'placeholder'
  | 'autoFocus'
  | 'onCompositionStart'
  | 'onCompositionEnd'
  | 'onKeyDown';

export const TextAreaElement = defineBaseElement<
  'textarea',
  TextAreaElementProps
>({
  type: 'textarea',
  displayName: 'TextArea',
});

export const AIConversationElements: AIConversationElements = {
  Button: ButtonElement,
  Heading: HeadingElement,
  Icon: IconElement,
  Input: InputElement,
  Image: ImageElement,
  Label: LabelElement,
  ListItem: ListItemElement,
  Span: SpanElement,
  Text: TextElement,
  TextArea: TextAreaElement,
  UnorderedList: UnorderedListElement,
  View: ViewElement,
};
