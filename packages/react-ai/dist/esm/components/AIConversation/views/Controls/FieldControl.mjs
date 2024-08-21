import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import '../../context/ActionsContext.mjs';
import '../../context/AvatarsContext.mjs';
import { InputContext } from '../../context/InputContext.mjs';
import { MessagesContext } from '../../context/MessagesContext.mjs';
import '../../context/SuggestedPromptsContext.mjs';
import '../../context/MessageVariantContext.mjs';
import { AIConversationElements } from '../../context/elements/definitions.mjs';
import { AttachFileControl } from './AttachFileControl.mjs';
import { AttachmentListControl } from './AttachmentListControl.mjs';
import { SendMessageContext } from '../../context/SendMessageContext.mjs';

const { Button, Icon, Label: LabelElement, TextArea, View, } = AIConversationElements;
const FIELD_BLOCK = 'ai-field';
const SendIcon = withBaseElementProps(Icon, {
    className: `${FIELD_BLOCK}__icon`,
    variant: 'send-message',
});
const SendButtonBase = withBaseElementProps(Button, {
    'aria-label': 'Send message',
    className: `${FIELD_BLOCK}__button ${FIELD_BLOCK}__button--send`,
});
const SendButton = React.forwardRef(function SendButton(props, ref) {
    const { input } = React.useContext(InputContext);
    const hasInput = !!input?.text || !!input?.files?.length;
    return (React.createElement(SendButtonBase, { ...props, disabled: !hasInput, type: "submit", ref: ref }));
});
const TextAreaBase = withBaseElementProps(TextArea, {
    className: `${FIELD_BLOCK}__input`,
    id: `${FIELD_BLOCK}-text-input`,
    name: 'text-input',
});
const VisuallyHidden = withBaseElementProps(View, {
    className: `${FIELD_BLOCK}__visually-hidden`,
});
const Label = withBaseElementProps(LabelElement, {
    children: 'Type your message here',
    className: `${FIELD_BLOCK}__label`,
    htmlFor: 'text-input',
});
const TextInput = React.forwardRef(function TextInput(props, ref) {
    const { setInput } = React.useContext(InputContext);
    const messages = React.useContext(MessagesContext);
    const textAreaRef = React.useRef(null);
    const isFirstMessage = !messages || messages.length === 0;
    React.useEffect(() => {
        const textarea = document.getElementById(`${FIELD_BLOCK}-text-input`);
        const handleResize = () => {
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };
        if (textarea && textarea instanceof HTMLTextAreaElement) {
            textarea.addEventListener('input', handleResize);
            handleResize();
        }
        return () => {
            if (textarea) {
                textarea.removeEventListener('input', handleResize);
            }
        };
    });
    React.useEffect(() => {
        if (textAreaRef && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [textAreaRef]);
    return (React.createElement(TextAreaBase, { ...props, "data-testid": "text-input", id: "text-input", onChange: (e) => props.onChange ??
            (setInput &&
                setInput((prevInput) => ({ ...prevInput, text: e.target.value }))), placeholder: props.placeholder ?? isFirstMessage
            ? 'Ask anything...'
            : 'Message Raven', ref: (node) => {
            textAreaRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            }
            else if (ref) {
                ref.current = node;
            }
        }, autoFocus: true }));
});
const InputContainer = withBaseElementProps(View, {
    className: `${FIELD_BLOCK}__input-container`,
});
const FieldControl = () => {
    const { input, setInput } = React.useContext(InputContext);
    const handleSendMessage = React.useContext(SendMessageContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        const submittedContent = [];
        if (input?.text) {
            const textContent = {
                text: input.text,
            };
            submittedContent.push(textContent);
        }
        if (input?.files) {
            input.files.forEach((file) => {
                file.arrayBuffer().then((buffer) => {
                    const fileContent = {
                        image: {
                            format: file.type,
                            source: { bytes: new Uint8Array(buffer) },
                        },
                    };
                    submittedContent.push(fileContent);
                });
            });
        }
        if (handleSendMessage)
            handleSendMessage({ content: submittedContent });
        if (setInput)
            setInput({ text: '', files: [] });
    };
    return (React.createElement("form", { className: `${FIELD_BLOCK}__form`, onSubmit: handleSubmit },
        React.createElement(AttachFileControl, null),
        React.createElement(InputContainer, null,
            React.createElement(VisuallyHidden, null,
                React.createElement(Label, null)),
            React.createElement(TextInput, null),
            React.createElement(AttachmentListControl, null)),
        React.createElement(SendButton, null,
            React.createElement(SendIcon, null))));
};
FieldControl.AttachFile = AttachFileControl;
FieldControl.InputContainer = InputContainer;
FieldControl.Label = Label;
FieldControl.TextInput = TextInput;
FieldControl.SendButton = SendButton;
FieldControl.SendIcon = SendIcon;

export { FieldControl };
