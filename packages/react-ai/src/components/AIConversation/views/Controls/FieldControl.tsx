import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { InputContext } from '../../context';
import { AIConversationElements } from '../../context/elements';
import { AttachFileControl } from './AttachFileControl';
import { MessagesContext } from '../../context';
import { AttachmentListControl } from './AttachmentListControl';
import { SendMessageContext } from '../../context/SendMessageContext';
import { ConversationMessageContent, InputContent } from '../../../../types';

const {
  Button,
  Icon,
  Label: LabelElement,
  TextArea,
  View,
} = AIConversationElements;

const FIELD_BLOCK = 'ai-field';

const SendIcon = withBaseElementProps(Icon, {
  className: `${FIELD_BLOCK}__icon`,
  variant: 'send-message',
});

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
        data-testid="send-button"
      />
    );
  }
);

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

const TextInput: typeof TextAreaBase = React.forwardRef(
  function TextInput(props, ref) {
    const { setInput } = React.useContext(InputContext);
    const messages = React.useContext(MessagesContext);
    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const isFirstMessage = !messages || messages.length === 0;

    React.useEffect(() => {
      const handleResize = () => {
        if (textAreaRef && textAreaRef.current) {
          textAreaRef.current.style.height = 'auto';
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
      };

      if (
        textAreaRef &&
        textAreaRef instanceof HTMLTextAreaElement &&
        textAreaRef.current
      ) {
        textAreaRef.current.addEventListener('input', handleResize);
        handleResize();
      }

      return () => {
        if (textAreaRef && textAreaRef.current) {
          textAreaRef.current.removeEventListener('input', handleResize);
        }
      };
    });

    React.useEffect(() => {
      if (textAreaRef && textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }, [textAreaRef]);

    return (
      <TextAreaBase
        {...props}
        data-testid="text-input"
        id="text-input"
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
        ref={(node) => {
          textAreaRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        autoFocus
      />
    );
  }
);

const InputContainer = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__input-container`,
});

export const FieldControl: FieldControl = () => {
  const { input, setInput } = React.useContext(InputContext);
  const handleSendMessage = React.useContext(SendMessageContext);
  const ref = React.useRef<HTMLFormElement | null>(null);

  const submitMessage = () => {
    ref.current?.reset();
    const submittedContent: InputContent[] = [];
    if (input?.text) {
      const textContent: InputContent = {
        text: input.text,
      };
      submittedContent.push(textContent);
    }
    if (input?.files) {
      input.files.forEach((file) => {
        file.arrayBuffer().then((buffer) => {
          const fileContent: ConversationMessageContent = {
            image: {
              format: file.type as 'png' | 'jpeg' | 'gif' | 'webp',
              source: { bytes: new Uint8Array(buffer) },
            },
          };
          submittedContent.push(fileContent);
        });
      });
    }
    if (handleSendMessage) handleSendMessage({ content: submittedContent });
    if (setInput) setInput({ text: '', files: [] });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage();
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const { key, shiftKey } = event;

    if (key === 'Enter' && !shiftKey) {
      event.preventDefault();

      const hasInput =
        !!input?.text || (input?.files?.length && input?.files?.length > 0);
      if (hasInput) {
        submitMessage();
      }
    }
  };

  return (
    <form
      className={`${FIELD_BLOCK}__form`}
      onSubmit={handleSubmit}
      method="post"
      ref={ref}
    >
      <AttachFileControl />
      <InputContainer>
        <VisuallyHidden>
          <Label />
        </VisuallyHidden>
        <TextInput onKeyDown={handleOnKeyDown} />
        <AttachmentListControl />
      </InputContainer>
      <SendButton>
        <SendIcon />
      </SendButton>
    </form>
  );
};

FieldControl.AttachFile = AttachFileControl;
FieldControl.InputContainer = InputContainer;
FieldControl.Label = Label;
FieldControl.TextInput = TextInput;
FieldControl.SendButton = SendButton;
FieldControl.SendIcon = SendIcon;

export interface FieldControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  AttachFile: AttachFileControl<T>;
  InputContainer: T['View'];
  Label: T['Label'];
  TextInput: T['TextArea'];
  SendButton: T['Button'];
  SendIcon: T['Icon'];
}
