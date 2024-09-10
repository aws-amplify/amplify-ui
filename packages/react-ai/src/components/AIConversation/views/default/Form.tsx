import * as React from 'react';
import {
  Button,
  DropZone,
  TextAreaField,
  View,
  VisuallyHidden,
} from '@aws-amplify/ui-react';
import { IconAttach, IconSend, useIcons } from '@aws-amplify/ui-react/internal';
import { ComponentClassName } from '@aws-amplify/ui';
import { ControlsContextProps } from '../../context/ControlsContext';
import { Attachments } from './Attachments';
import { LoadingContext } from '../../context/LoadingContext';

function isHTMLFormElement(target: EventTarget): target is HTMLFormElement {
  return 'form' in target;
}

export const Form: NonNullable<ControlsContextProps['Form']> = ({
  setInput,
  input,
  handleSubmit,
}) => {
  const icons = useIcons('aiConversation');
  const sendIcon = icons?.send ?? <IconSend />;
  const attachIcon = icons?.attach ?? <IconAttach />;
  const hiddenInput = React.useRef<HTMLInputElement>(null);
  const isLoading = React.useContext(LoadingContext);
  const isInputEmpty = !input?.text?.length && !input?.files?.length;

  return (
    <DropZone
      className={ComponentClassName.AIConversationFormDropzone}
      onDropComplete={({ acceptedFiles }) => {
        setInput((prevInput) => ({
          ...prevInput,
          files: [...(prevInput?.files ?? []), ...acceptedFiles],
        }));
      }}
    >
      <View
        as="form"
        className={ComponentClassName.AIConversationForm}
        onSubmit={handleSubmit}
      >
        <Button
          className={ComponentClassName.AIConversationFormAttach}
          onClick={() => {
            hiddenInput?.current?.click();
            if (hiddenInput?.current) {
              hiddenInput.current.value = '';
            }
          }}
        >
          <span>{attachIcon}</span>
          <VisuallyHidden>
            <input
              type="file"
              tabIndex={-1}
              ref={hiddenInput}
              onChange={(e) => {
                const { files } = e.target;
                if (!files || files.length === 0) {
                  return;
                }
                setInput((prevValue) => ({
                  ...prevValue,
                  files: [...(prevValue?.files ?? []), ...Array.from(files)],
                }));
              }}
              multiple
              accept="*"
              data-testid="hidden-file-input"
            />
          </VisuallyHidden>
        </Button>
        <TextAreaField
          className={ComponentClassName.AIConversationFormField}
          label="input"
          labelHidden
          autoResize
          flex="1"
          rows={1}
          value={input?.text ?? ''}
          testId="text-input"
          onKeyDown={(e) => {
            // Submit on enter key if shift is not pressed also
            const shouldSubmit = !e.shiftKey && e.key === 'Enter';
            if (shouldSubmit && isHTMLFormElement(e.target)) {
              (e.target.form as HTMLFormElement).requestSubmit();
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setInput((prevValue) => ({
              ...prevValue,
              text: e.target.value,
            }));
          }}
        />

        <Button
          type="submit"
          variation="primary"
          className={ComponentClassName.AIConversationFormSend}
          // we intentionally || in the case where isLoading is false we should use the value of isInputEmpty
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          isDisabled={isLoading || isInputEmpty}
        >
          <span>{sendIcon}</span>
        </Button>
      </View>
      <Attachments setInput={setInput} files={input?.files} />
    </DropZone>
  );
};
