import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from '../../context/elements';
import { InputContext } from '../../context';

const { Button, Icon, TextArea, View } = AIConversationElements;

const INPUT_BLOCK = 'ai-input';

const iconAttributes = {
  'aria-hidden': true,
  className: `${INPUT_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const attachIconProps = () => ({
  children: (
    <svg xmlns="http://www.w3.org/2000/svg">
      <path d="M8.75359 1.77776L2.31859 8.06463C0.807379 9.54105 0.807379 11.9348 2.31859 13.4112C3.82979 14.8876 6.27994 14.8876 7.79115 13.4112L14.1146 7.23333C15.1487 6.22305 15.1487 4.55966 14.1146 3.54938V3.54938C13.1086 2.5665 11.5 2.57263 10.5015 3.56314L4.18049 9.83349C3.68347 10.3191 3.68347 11.1063 4.18049 11.5919C4.67752 12.0775 5.48335 12.0775 5.98037 11.5919L12.3013 5.41656" />
    </svg>
  ),
  stroke: '#0D1A26',
  ...iconAttributes,
});

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
  ...iconAttributes,
});

const AttachIcon = withBaseElementProps(Icon, attachIconProps);
const SendIcon = withBaseElementProps(Icon, sendIconProps);

const AttachButtonBase = withBaseElementProps(Button, {
  'aria-label': 'Attach item',
  className: `${INPUT_BLOCK}__button__copy`,
  role: 'button',
});

const AttachButton: typeof AttachButtonBase = React.forwardRef(
  function AttachButton(props, ref) {
    return (
      <AttachButtonBase
        onClick={() => {
          /* TODO attach item on click */
        }}
        {...props}
        ref={ref}
      />
    );
  }
);

const SendButtonBase = withBaseElementProps(Button, {
  'aria-label': 'Send message',
  className: `${INPUT_BLOCK}__button__send`,
  disabled: false,
  'aria-disabled': false,
  role: 'button',
});

const SendButton: typeof SendButtonBase = React.forwardRef(
  function SendButton(props, ref) {
    // TODO should come from context
    const isWaitingForResponse = false;
    return (
      <SendButtonBase
        onClick={() => {
          /* TODO send message on click */
        }}
        disabled={isWaitingForResponse}
        aria-disabled={isWaitingForResponse}
        {...props}
        ref={ref}
      />
    );
  }
);

const TextInputBase = withBaseElementProps(TextArea, {
  className: `${INPUT_BLOCK}__input`,
  placeholder: 'Ask anything...',
  onChange: () => {},
  id: `${INPUT_BLOCK}-text-input`,
});

const TextInput: typeof TextInputBase = React.forwardRef(
  function TextInput(props, ref) {
    const { input, setInput } = React.useContext(InputContext);

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
    }, [input]);

    return (
      <TextInputBase
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          // TODO sanitize input?
          setInput && setInput(e.target.value)
        }
        {...props}
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
      <AttachButton>
        <AttachIcon />
      </AttachButton>
      <TextInput />
      <SendButton>
        <SendIcon />
      </SendButton>
    </Container>
  );
};

InputControl.AttachButton = AttachButton;
InputControl.AttachIcon = AttachIcon;
InputControl.Container = Container;
InputControl.Input = TextInput;
InputControl.SendButton = SendButton;
InputControl.SendIcon = SendIcon;

export interface InputControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  AttachButton: T['Button'];
  AttachIcon: T['Icon'];
  Input: T['TextArea'];
  SendButton: T['Button'];
  SendIcon: T['Icon'];
}
