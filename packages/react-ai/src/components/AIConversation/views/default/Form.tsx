import * as React from 'react';
import { humanFileSize } from '@aws-amplify/ui';
import {
  Button,
  DropZone,
  Message,
  TextAreaField,
  View,
  VisuallyHidden,
} from '@aws-amplify/ui-react';
import { IconAttach, IconSend, useIcons } from '@aws-amplify/ui-react/internal';
import { ComponentClassName } from '@aws-amplify/ui';
import { ControlsContextProps } from '../../context/ControlsContext';
import { Attachments } from './Attachments';
import { attachmentsValidator } from '../../utils';

function isHTMLFormElement(target: EventTarget): target is HTMLFormElement {
  return 'form' in target;
}

/**
 * Will conditionally render the DropZone if allowAttachments
 * is true
 */
const FormWrapper = ({
  children,
  allowAttachments,
  validateAttachments,
}: {
  children: React.ReactNode;
  allowAttachments?: boolean;
  validateAttachments: (files: File[]) => Promise<void>;
}) => {
  if (allowAttachments) {
    return (
      <DropZone
        className={ComponentClassName.AIConversationFormDropzone}
        onDropComplete={({ acceptedFiles }) => {
          validateAttachments(acceptedFiles);
        }}
      >
        {children}
      </DropZone>
    );
  } else {
    return children;
  }
};

export const Form: Required<ControlsContextProps>['Form'] = ({
  setInput,
  input,
  handleSubmit,
  allowAttachments,
  maxAttachmentSize,
  maxAttachments,
  displayText,
  isLoading,
  error,
  setError,
}) => {
  const icons = useIcons('aiConversation');
  const sendIcon = icons?.send ?? <IconSend />;
  const attachIcon = icons?.attach ?? <IconAttach />;
  const hiddenInput = React.useRef<HTMLInputElement>(null);
  const [composing, setComposing] = React.useState(false);
  const isInputEmpty = !input?.text?.length && !input?.files?.length;

  const validateAttachments = React.useCallback(
    async (files: File[]) => {
      const previousFiles = input?.files ?? [];
      const { acceptedFiles, hasMaxError, hasMaxSizeError } =
        await attachmentsValidator({
          files: [...files, ...previousFiles],
          maxAttachments,
          maxAttachmentSize,
        });

      if (hasMaxError ?? hasMaxSizeError) {
        let error = '';
        if (hasMaxError) {
          error += displayText.getMaxAttachmentErrorText(maxAttachments);
        }
        if (hasMaxSizeError) {
          error += displayText.getAttachmentSizeErrorText(
            // base64 size is about 137% that of the file size
            // https://en.wikipedia.org/wiki/Base64#MIME
            humanFileSize((maxAttachmentSize - 814) / 1.37, true)
          );
        }
        setError(error);
      } else {
        setError(undefined);
      }

      setInput((prevValue) => ({
        ...prevValue,
        files: acceptedFiles,
      }));
    },
    [setInput, input, displayText, maxAttachmentSize, maxAttachments, setError]
  );

  return (
    <FormWrapper
      validateAttachments={validateAttachments}
      allowAttachments={allowAttachments}
    >
      <View
        as="form"
        className={ComponentClassName.AIConversationForm}
        onSubmit={handleSubmit}
      >
        {allowAttachments ? (
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
                  if (!e.target.files || e.target.files.length === 0) {
                    return;
                  }
                  validateAttachments(Array.from(e.target.files));
                }}
                multiple
                accept=".jpeg,.png,.webp,.gif"
                data-testid="hidden-file-input"
              />
            </VisuallyHidden>
          </Button>
        ) : null}

        <TextAreaField
          className={ComponentClassName.AIConversationFormField}
          label="input"
          labelHidden
          autoResize
          flex="1"
          rows={1}
          value={input?.text ?? ''}
          testId="text-input"
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          onKeyDown={(e) => {
            // Submit on enter key if shift is not pressed also
            const shouldSubmit = !e.shiftKey && e.key === 'Enter' && !composing;
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
      {error ? (
        <Message
          className={ComponentClassName.AIConversationFormError}
          variation="plain"
          colorTheme="warning"
        >
          {error}
        </Message>
      ) : null}
      <Attachments setInput={setInput} files={input?.files} />
    </FormWrapper>
  );
};
