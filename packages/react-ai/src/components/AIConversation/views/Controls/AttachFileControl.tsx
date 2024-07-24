import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from '../../context/elements';

const { Button, Icon, View } = AIConversationElements;

const FIELD_BLOCK = 'ai-field';
const ATTACH_FILE_BLOCK = 'ai-attach-file';

const AttachFileIcon = withBaseElementProps(Icon, { variant: 'attach' });

const AttachFileContainer = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__${ATTACH_FILE_BLOCK}__container`,
});

const VisuallyHidden = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__visually-hidden`,
});

const AttachFileButton = withBaseElementProps(Button, {
  'aria-label': 'Attach file',
  className: `${FIELD_BLOCK}__button ${FIELD_BLOCK}__button--attach`,
  variant: 'attach',
});

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
        <AttachFileIcon />
      </AttachFileButton>
      <VisuallyHidden>
        <input
          data-testid="hidden-file-input"
          // TODO follow up about what file types are accepted
          accept="image/*"
          type="file"
          ref={hiddenInput}
        />
      </VisuallyHidden>
    </AttachFileContainer>
  );
};

AttachFileControl.Icon = AttachFileIcon;
AttachFileControl.Button = AttachFileButton;
AttachFileControl.Container = AttachFileContainer;

export interface AttachFileControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  Icon: T['Icon'];
  Button: T['Button'];
}
