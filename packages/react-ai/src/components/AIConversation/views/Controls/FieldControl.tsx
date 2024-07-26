import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from '../../context/elements';
import { AttachFileControl } from './AttachFileControl';

const { Button, Icon, TextArea, View } = AIConversationElements;

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
    // TODO should come from context
    const isWaitingForResponse = false;
    // TODO send message on click
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
    // TODO should come from context or prop
    const isFirstMessage = true;

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
        placeholder={isFirstMessage ? 'Ask anything...' : 'Message Raven'}
        ref={ref}
      />
    );
  }
);

const Container = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__container`,
});

export const FieldControl: FieldControl = () => {
  return (
    <Container>
      <AttachFileControl />
      <TextInput />
      <SendButton>
        <SendIcon />
      </SendButton>
    </Container>
  );
};

FieldControl.AttachFile = AttachFileControl;
FieldControl.Container = Container;
FieldControl.TextInput = TextInput;
FieldControl.SendButton = SendButton;
FieldControl.SendIcon = SendIcon;

export interface FieldControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  AttachFile: AttachFileControl<T>;
  TextInput: T['TextArea'];
  SendButton: T['Button'];
  SendIcon: T['Icon'];
}
