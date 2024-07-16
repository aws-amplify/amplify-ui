import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from '../../context/elements';

const { Button, Icon, TextArea, View } = AIConversationElements;

const INPUT_BLOCK = 'ai-input';

const copyIconProps = () => ({
  children: (
    <svg xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.75359 1.77776L2.31859 8.06463C0.807379 9.54105 0.807379 11.9348 2.31859 13.4112C3.82979 14.8876 6.27994 14.8876 7.79115 13.4112L14.1146 7.23333C15.1487 6.22305 15.1487 4.55966 14.1146 3.54938V3.54938C13.1086 2.5665 11.5 2.57263 10.5015 3.56314L4.18049 9.83349C3.68347 10.3191 3.68347 11.1063 4.18049 11.5919C4.67752 12.0775 5.48335 12.0775 5.98037 11.5919L12.3013 5.41656"
        stroke="#0D1A26"
        strokeWidth="1.5"
      />
    </svg>
  ),
  className: `${INPUT_BLOCK}__icon__copy`,
  width: '100%',
  height: '100%',
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
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
          stroke="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_387_1426">
          <rect width="100%" height="100%" />
        </clipPath>
      </defs>
    </svg>
  ),
  className: `${INPUT_BLOCK}__icon__send`,
  width: '100%',
  height: '100%',
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

const SendIcon = withBaseElementProps(Icon, sendIconProps);

const SendButtonBase = withBaseElementProps(Button, {
  className: `${INPUT_BLOCK}__button__send`,
});

const SendButton: typeof SendButtonBase = React.forwardRef(
  function SendButton(props, ref) {
    return <SendButtonBase {...props} ref={ref} />;
  }
);

const CopyIcon = withBaseElementProps(Icon, copyIconProps);

const CopyButtonBase = withBaseElementProps(Button, {
  className: `${INPUT_BLOCK}__button__copy`,
});

const CopyButton: typeof CopyButtonBase = React.forwardRef(
  function CopyButton(props, ref) {
    return <CopyButtonBase {...props} ref={ref} />;
  }
);

const TextInputBase = withBaseElementProps(TextArea, {
  className: `${INPUT_BLOCK}__input`,
});

const TextInput: typeof TextInputBase = React.forwardRef(
  function TextInput(props, ref) {
    return <TextInputBase {...props} ref={ref} />;
  }
);

const Container = withBaseElementProps(View, {
  className: `${INPUT_BLOCK}__container`,
});

export const InputControl: InputControl = () => {
  return (
    <Container>
      <CopyButton>
        <CopyIcon />
      </CopyButton>
      <TextInput />
      <SendButton>
        <SendIcon />
      </SendButton>
    </Container>
  );
};

InputControl.Input = TextInput;
InputControl.Container = Container;
InputControl.Copy = CopyButton;
InputControl.Send = SendButton;

export interface InputControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  Copy: T['Button'];
  Input: T['TextArea'];
  Send: T['Button'];
}
