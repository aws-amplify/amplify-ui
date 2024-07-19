import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from '../../context/elements';
import { AttachFileControl } from './AttachFileControl';

const { Button, Icon, TextArea, View } = AIConversationElements;

const INPUT_BLOCK = 'ai-input';

const sendIconProps = () => ({
  children: (
    <svg>
      <g clipPath="url(#clip0_387_1426)">
        <path
          d="M14.3199 7.98214L1.66669 1.23486L3.97674 7.98214M14.3199 7.98214L1.66669 14.5689L3.97674 7.98214M14.3199 7.98214H3.97674"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_387_1426">
          <rect width="100%" height="100%" />
        </clipPath>
      </defs>
    </svg>
  ),
  stroke: 'white',
  'aria-hidden': true,
  className: `${INPUT_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

const SendIcon = withBaseElementProps(Icon, sendIconProps);

const SendButtonBase = withBaseElementProps(Button, {
  'aria-label': 'Send message',
  className: `${INPUT_BLOCK}__button ${INPUT_BLOCK}__button--send`,
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
  className: `${INPUT_BLOCK}__input`,
  id: `${INPUT_BLOCK}-text-input`,
});

const TextInput: typeof TextAreaBase = React.forwardRef(
  function TextInput(props, ref) {
    // TODO should come from context or prop
    const isFirstMessage = true;

    React.useEffect(() => {
      const textarea = document.getElementById(`${INPUT_BLOCK}-text-input`);

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
  className: `${INPUT_BLOCK}__container`,
});

export const InputControl: InputControl = () => {
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

InputControl.AttachFile = AttachFileControl;
InputControl.Container = Container;
InputControl.Input = TextInput;
InputControl.SendButton = SendButton;
InputControl.SendIcon = SendIcon;

export interface InputControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  AttachFile: AttachFileControl<T>;
  Input: T['TextArea'];
  SendButton: T['Button'];
  SendIcon: T['Icon'];
}
