import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { ImageContentBlock, TextContent } from '../../types';
import { InputContext } from '../../context';
import { AIConversationElements } from '../../context/elements';
import { AttachFileControl } from './AttachFileControl';
import { MessagesContext } from '../../context';
import { AttachmentListControl } from './AttachmentListControl';

const {
  Button,
  Form: FormElement,
  Icon,
  TextArea,
  View,
} = AIConversationElements;

const FIELD_BLOCK = 'ai-field';

const sendIconProps = () => ({
  children: (
    <path
      d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
      fill="currentColor"
    />
  ),
  'aria-hidden': true,
  className: `${FIELD_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 -960 960 960',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

const SendIcon = withBaseElementProps(Icon, sendIconProps);

const SendButtonBase = withBaseElementProps(Button, {
  'aria-label': 'Send message',
  className: `${FIELD_BLOCK}__button ${FIELD_BLOCK}__button--send`,
});

const SendButton: typeof SendButtonBase = React.forwardRef(
  function SendButton(props, ref) {
    const { input } = React.useContext(InputContext);
    // TODO should come from context
    const isWaitingForResponse = false;
    const hasInput = !!input?.text || !!input?.files?.length;

    return (
      <SendButtonBase
        {...props}
        disabled={isWaitingForResponse || !hasInput}
        type="submit"
        ref={ref}
      />
    );
  }
);

const TextAreaBase = withBaseElementProps(TextArea, {
  className: `${FIELD_BLOCK}__input`,
  id: `${FIELD_BLOCK}-text-input`,
  name: 'text-input',
});

const TextInput: typeof TextAreaBase = React.forwardRef(
  function TextInput(props, ref) {
    const { setInput } = React.useContext(InputContext);
    const messages = React.useContext(MessagesContext);
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

    return (
      <TextAreaBase
        {...props}
        data-testid="text-input"
        onChange={(e) =>
          props.onChange ??
          (setInput &&
            setInput((prevInput) => ({ ...prevInput, text: e.target.value })))
        }
        placeholder={
          props.placeholder ?? isFirstMessage
            ? 'Ask anything...'
            : 'Message Raven'
        }
        ref={ref}
      />
    );
  }
);

const FormBase = withBaseElementProps(FormElement, {
  className: `${FIELD_BLOCK}__form`,
});

const Form: typeof FormBase = React.forwardRef(function Form(props, ref) {
  const { input, setInput } = React.useContext(InputContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();

    if (input?.text) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO send message
      const textContent: TextContent = {
        type: 'text',
        value: input.text,
      };
    }
    if (input?.files) {
      input.files.map((file) => {
        file.arrayBuffer().then((buffer) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO send message
          const fileContent: ImageContentBlock = {
            type: 'image',
            value: {
              format: file.type as 'png' | 'jpeg' | 'gif' | 'webp',
              bytes: buffer,
            },
          };
        });
      });
    }
    if (setInput) setInput({ text: '', files: [] });
  };
  return <FormBase {...props} onSubmit={handleSubmit} ref={ref} />;
});

const InputContainer = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__input-container`,
});

export const FieldControl: FieldControl = () => {
  return (
    <Form>
      <AttachFileControl />
      <InputContainer>
        <TextInput />
        <AttachmentListControl />
      </InputContainer>
      <SendButton>
        <SendIcon />
      </SendButton>
    </Form>
  );
};

FieldControl.AttachFile = AttachFileControl;
FieldControl.Form = Form;
FieldControl.InputContainer = InputContainer;
FieldControl.TextInput = TextInput;
FieldControl.SendButton = SendButton;
FieldControl.SendIcon = SendIcon;

export interface FieldControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  Form: T['Form'];
  AttachFile: AttachFileControl<T>;
  InputContainer: T['View'];
  TextInput: T['TextArea'];
  SendButton: T['Button'];
  SendIcon: T['Icon'];
}
