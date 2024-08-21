import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';
import { IconElement } from './IconElement.mjs';

const LabelElement = defineBaseElement({
    type: 'label',
    displayName: 'Label',
});
const TextElement = defineBaseElement({
    type: 'p',
    displayName: 'Text',
});
const UnorderedListElement = defineBaseElement({
    type: 'ul',
    displayName: 'UnorderedList',
});
const ListItemElement = defineBaseElement({
    type: 'li',
    displayName: 'ListItem',
});
const HeadingElement = defineBaseElement({
    type: 'h2',
    displayName: 'Title',
});
const ImageElement = defineBaseElement({
    type: 'img',
    displayName: 'Image',
});
const InputElement = defineBaseElement({
    type: 'input',
    displayName: 'Input',
});
const ButtonElement = defineBaseElement({ type: 'button', displayName: 'Button' });
const ViewElement = defineBaseElement({
    type: 'div',
    displayName: 'View',
});
const SpanElement = defineBaseElement({
    type: 'span',
    displayName: 'Span',
});
const TextAreaElement = defineBaseElement({
    type: 'textarea',
    displayName: 'TextArea',
});
const AIConversationElements = {
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

export { AIConversationElements, ButtonElement, HeadingElement, ImageElement, InputElement, LabelElement, ListItemElement, SpanElement, TextAreaElement, TextElement, UnorderedListElement, ViewElement };
