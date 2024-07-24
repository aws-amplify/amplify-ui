import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { InputContext } from '../../context';
import { AIConversationElements } from '../../context/elements';

const { Button, Icon, View } = AIConversationElements;

const FIELD_BLOCK = 'ai-field';
const ATTACH_FILE_BLOCK = 'ai-attach-file';

const attachIconProps = () => ({
  children: (
    <path
      d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z"
      fill="currentColor"
    />
  ),
  'aria-hidden': true,
  className: `${FIELD_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 -960 960 960',
  fill: 'none',
  variant: 'attach',
  xmlns: 'http://www.w3.org/2000/svg',
});

const AttachFileIcon = withBaseElementProps(Icon, attachIconProps);

const AttachFileContainer = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__${ATTACH_FILE_BLOCK}__container`,
});

const VisuallyHidden = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__visually-hidden`,
});

const AttachFileButton = withBaseElementProps(Button, {
  'aria-label': 'Attach file',
  className: `${FIELD_BLOCK}__button ${FIELD_BLOCK}__button--attach`,
  type: 'button',
  variant: 'attach',
});

export const AttachFileControl: AttachFileControl = () => {
  const hiddenInput = React.useRef<HTMLInputElement>(null);
  const { setFileInput } = React.useContext(InputContext);

  function handleButtonClick() {
    if (hiddenInput.current) {
      hiddenInput.current.click();
      hiddenInput.current.value = '';
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files && files?.length > 0 && setFileInput) {
      Array.from(files).forEach((file) => {
        setFileInput((prevFiles) => [...prevFiles, file]);
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
          // TODO follow up about what file types are accepted
          accept="image/*"
          data-testid="hidden-file-input"
          onChange={handleFileChange}
          ref={hiddenInput}
          type="file"
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
