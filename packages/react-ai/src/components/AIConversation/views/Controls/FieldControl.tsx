import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { InputContext } from '../../context';
import { AIConversationElements } from '../../context/elements';
import { AttachFileControl } from './AttachFileControl';
import { MessagesContext } from '../../context';
import { AttachmentListControl } from './AttachmentListControl';

const { Button, Icon, TextArea, View } = AIConversationElements;

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
    // TODO should come from context
    const isWaitingForResponse = false;
    return (
      <SendButtonBase
        {...props}
        disabled={isWaitingForResponse}
        type="submit"
        ref={ref}
      />
    );
  }
);

const TextAreaBase = withBaseElementProps(TextArea, {
  className: `${FIELD_BLOCK}__input`,
  id: `${FIELD_BLOCK}-text-input`,
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
        onChange={(e) => setInput && setInput(e.target.value)}
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

const Container = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__container`,
});

const InputContainer = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__input-container`,
});

export const FieldControl: FieldControl = () => {
  return (
    <Container>
      <AttachFileControl />
      <InputContainer>
        <TextInput />
        <AttachmentListControl />
      </InputContainer>
      <SendButton>
        <SendIcon />
      </SendButton>
    </Container>
  );
};

FieldControl.AttachFile = AttachFileControl;
FieldControl.Container = Container;
FieldControl.InputContainer = InputContainer;
FieldControl.TextInput = TextInput;
FieldControl.SendButton = SendButton;
FieldControl.SendIcon = SendIcon;

export interface FieldControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  AttachFile: AttachFileControl<T>;
  InputContainer: T['View'];
  TextInput: T['TextArea'];
  SendButton: T['Button'];
  SendIcon: T['Icon'];
}
