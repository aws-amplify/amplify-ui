import { defineBaseElementWithRef } from '@aws-amplify/ui-react-core/elements';
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

export const LabelElement = defineBaseElementWithRef<'label', 'htmlFor'>({
  type: 'label',
  displayName: 'Label',
});

export const TextElement = defineBaseElementWithRef({
  type: 'p',
  displayName: 'Text',
});

export const UnorderedListElement = defineBaseElementWithRef({
  type: 'ul',
  displayName: 'UnorderedList',
});

export const ListItemElement = defineBaseElementWithRef({
  type: 'li',
  displayName: 'ListItem',
});

export const HeadingElement = defineBaseElementWithRef({
  type: 'h2',
  displayName: 'Title',
});

export type IconElementProps = React.ComponentProps<typeof IconElement>;

type ImageElementProps = 'src' | 'alt';
export const ImageElement = defineBaseElementWithRef<'img', ImageElementProps>({
  type: 'img',
  displayName: 'Image',
});

export const InputElement = defineBaseElementWithRef<'input', 'type'>({
  type: 'input',
  displayName: 'Input',
});

type ButtonElementProps = 'disabled' | 'onClick' | 'type' | 'tabIndex';
type ButtonElementVariant = 'attach' | 'remove' | 'send-message';

export const ButtonElement = defineBaseElementWithRef<
  'button',
  ButtonElementProps,
  ButtonElementVariant
>({ type: 'button', displayName: 'Button' });

type ViewElementProps = 'onFocus' | 'tabIndex' | 'onKeyDown';

export const ViewElement = defineBaseElementWithRef<'div', ViewElementProps>({
  type: 'div',
  displayName: 'View',
});

export const SpanElement = defineBaseElementWithRef({
  type: 'span',
  displayName: 'Span',
});

type TextAreaElementProps =
  | 'id'
  | 'name'
  | 'onChange'
  | 'placeholder'
  | 'autoFocus'
  | 'onKeyDown';

export const TextAreaElement = defineBaseElementWithRef<
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
