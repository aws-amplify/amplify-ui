import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from '../../context/elements';

const { Button, Icon, Input, View } = AIConversationElements;

const INPUT_BLOCK = 'ai-input';
const ATTACH_FILE_BLOCK = 'ai-attach-file';

const attachIconProps = () => ({
  children: (
    <svg xmlns="http://www.w3.org/2000/svg">
      <path d="M8.75359 1.77776L2.31859 8.06463C0.807379 9.54105 0.807379 11.9348 2.31859 13.4112C3.82979 14.8876 6.27994 14.8876 7.79115 13.4112L14.1146 7.23333C15.1487 6.22305 15.1487 4.55966 14.1146 3.54938V3.54938C13.1086 2.5665 11.5 2.57263 10.5015 3.56314L4.18049 9.83349C3.68347 10.3191 3.68347 11.1063 4.18049 11.5919C4.67752 12.0775 5.48335 12.0775 5.98037 11.5919L12.3013 5.41656" />
    </svg>
  ),
  stroke: '#0D1A26',
  'aria-hidden': true,
  className: `${INPUT_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

const AttachIcon = withBaseElementProps(Icon, attachIconProps);

const AttachFileContainer = withBaseElementProps(View, {
  className: `${INPUT_BLOCK}__${ATTACH_FILE_BLOCK}__container`,
});

const VisuallyHidden = withBaseElementProps(View, {
  className: `${INPUT_BLOCK}__visually-hidden`,
});

const AttachFileButton = withBaseElementProps(Button, {
  'aria-label': 'Attach file',
  className: `${INPUT_BLOCK}__button ${INPUT_BLOCK}__button--attach`,
});

const AttachFileInputBase = withBaseElementProps(Input, {
  'aria-label': 'Attach file',
  accept: 'image/*',
  className: `${INPUT_BLOCK}__attach-file-input`,
  type: 'file',
});

const AttachFileInput: typeof AttachFileInputBase = React.forwardRef(
  function AttachFileInput(props, ref) {
    // TODO should attach file to message
    return (
      <AttachFileInputBase
        data-testid="hidden-file-input"
        {...props}
        ref={ref}
      />
    );
  }
);

export const AttachFileControl: AttachFileControl = () => {
  const hiddenInput = React.useRef<HTMLInputElement>(null);

  function handleClick() {
    if (hiddenInput.current) {
      hiddenInput.current.click();
      hiddenInput.current.value = '';
    }
  }

  return (
    <AttachFileContainer>
      <AttachFileButton onClick={handleClick}>
        <AttachIcon />
      </AttachFileButton>
      <VisuallyHidden>
        <AttachFileInput ref={hiddenInput} />
      </VisuallyHidden>
    </AttachFileContainer>
  );
};

AttachFileControl.Container = AttachFileContainer;
AttachFileControl.Button = AttachFileButton;
AttachFileControl.Input = AttachFileInput;
AttachFileControl.VisuallyHidden = VisuallyHidden;

export interface AttachFileControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
  Container: T['View'];
  Input: T['Input'];
  VisuallyHidden: T['View'];
}
