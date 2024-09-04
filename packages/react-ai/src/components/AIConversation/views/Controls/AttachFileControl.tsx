import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { ConversationInputContext } from '../../context';
import { AIConversationElements } from '../../context/elements';

const { Button, Icon, View } = AIConversationElements;

const ATTACH_FILE_BLOCK = 'ai-attach-file';
const FIELD_BLOCK = 'ai-field';

const AttachFileIcon = withBaseElementProps(Icon, {
  className: `${ATTACH_FILE_BLOCK}__icon`,
  variant: 'attach',
});

const AttachFileContainer = withBaseElementProps(View, {
  className: `${ATTACH_FILE_BLOCK}__container`,
});

const VisuallyHidden = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__visually-hidden`,
});

const AttachFileButton = withBaseElementProps(Button, {
  'aria-label': 'Attach file',
  className: `${FIELD_BLOCK}__button`,
  type: 'button',
  variant: 'attach',
});

export const AttachFileControl: AttachFileControl = () => {
  const hiddenInput = React.useRef<HTMLInputElement>(null);
  const { setInput } = React.useContext(ConversationInputContext);

  function handleButtonClick() {
    if (hiddenInput.current) {
      hiddenInput.current.click();
      hiddenInput.current.value = '';
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files && files?.length > 0 && setInput) {
      Array.from(files).forEach((file) => {
        setInput((prevInput) => ({
          ...prevInput,
          files: [...(prevInput?.files ?? []), file],
        }));
      });
    }
  }

  return (
    <AttachFileContainer>
      <AttachFileButton onClick={handleButtonClick}>
        <AttachFileIcon />
      </AttachFileButton>
      <VisuallyHidden>
        <input
          accept=".jpeg,.png,.webp,.gif"
          data-testid="hidden-file-input"
          onChange={handleFileChange}
          ref={hiddenInput}
          type="file"
          multiple
        />
      </VisuallyHidden>
    </AttachFileContainer>
  );
};

AttachFileControl.Icon = AttachFileIcon;
AttachFileControl.Button = AttachFileButton;
AttachFileControl.Container = AttachFileContainer;

export interface AttachFileControl {
  (): React.JSX.Element;
  Container: AIConversationElements['View'];
  Icon: AIConversationElements['Icon'];
  Button: AIConversationElements['Button'];
}
