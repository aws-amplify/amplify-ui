import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';

export interface AIConversationElements {
  Button: typeof ButtonElement;
  Icon: typeof IconElement;
  Image: typeof ImageElement;
  Span: typeof SpanElement;
  Text: typeof TextElement;
  View: typeof ViewElement;
}

type ButtonElementProps = 'onClick' | 'type';
type ButtonElementVariant = 'custom-action' | 'message-submit';

export const ButtonElement = defineBaseElement<
  'button',
  ButtonElementProps,
  ButtonElementVariant
>({ type: 'button', displayName: 'Button' });

type IconVariant = 'avatar' | 'custom-action';

export const IconElement = defineBaseElement<'svg', never, IconVariant>({
  type: 'svg',
  displayName: 'Icon',
});

export const ImageElement = defineBaseElement({
  type: 'img',
  displayName: 'Image',
});

export const SpanElement = defineBaseElement({
  type: 'span',
  displayName: 'Span',
});

export const TextElement = defineBaseElement({
  type: 'p',
  displayName: 'Text',
});

export const ViewElement = defineBaseElement({
  type: 'div',
  displayName: 'View',
});

export const AIConversationElements: AIConversationElements = {
  Button: ButtonElement,
  Icon: IconElement,
  Image: ImageElement,
  Span: SpanElement,
  Text: TextElement,
  View: ViewElement,
};
