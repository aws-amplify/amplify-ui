import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import type { ConversationInput } from '../../context';
import {
  AIContextContext,
  ConversationInputContext,
  useConversationDisplayText,
} from '../../context';
import { AIConversationElements } from '../../context/elements';
import { AttachFileControl } from './AttachFileControl';
import { MessagesContext } from '../../context';
import { AttachmentListControl } from './AttachmentListControl';
import { SendMessageContext } from '../../context/SendMessageContext';
import type { InputContent } from '../../../../types';
import {
  convertResponseComponentsToToolConfiguration,
  ResponseComponentsContext,
} from '../../context/ResponseComponentsContext';
import { ControlsContext } from '../../context/ControlsContext';
import {
  attachmentsValidator,
  getAttachmentFormat,
  getValidDocumentName,
  isDocumentFormat,
  isImageFormat,
  validFileTypes,
} from '../../utils';
import { LoadingContext } from '../../context/LoadingContext';
import { AttachmentContext } from '../../context/AttachmentContext';
import { humanFileSize, isFunction } from '@aws-amplify/ui';

const {
  Button,
  Icon,
  Label: LabelElement,
  TextArea,
  View,
} = AIConversationElements;

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
    const { input } = React.useContext(ConversationInputContext);
    const isLoading = React.useContext(LoadingContext);
    const hasInput = !!input?.text || !!input?.files?.length;

    return (
      <SendButtonBase
        {...props}
        // we intentionally || in the case where isLoading is false we should use the value of hasInput
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        disabled={isLoading || !hasInput}
        type="submit"
        ref={ref}
        data-testid="send-button"
      />
    );
  }
);

const TextAreaBase = withBaseElementProps(TextArea, {
  className: `${FIELD_BLOCK}__input`,
  id: `${FIELD_BLOCK}-text-input`,
  name: 'text-input',
});

const VisuallyHidden = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__visually-hidden`,
});

const Label = withBaseElementProps(LabelElement, {
  children: 'Type your message here',
  className: `${FIELD_BLOCK}__label`,
  htmlFor: 'text-input',
});

const useHandleResize = (
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>
) => {
  React.useEffect(() => {
    const { current } = textAreaRef;
    const handleResize = () => {
      if (current) {
        current.style.height = 'auto';
        current.style.height = `${current.scrollHeight}px`;
      }
    };

    if (current) {
      current.addEventListener('input', handleResize);
      handleResize();
    }

    return () => {
      if (current) {
        current.removeEventListener('input', handleResize);
      }
    };
  }, [textAreaRef]);
};

const TextInput: typeof TextAreaBase = React.forwardRef(
  function TextInput(props, ref) {
    const { setInput } = React.useContext(ConversationInputContext);
    const messages = React.useContext(MessagesContext);
    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
    useHandleResize(textAreaRef);

    const isFirstMessage = !messages || messages.length === 0;

    React.useEffect(() => {
      if (textAreaRef && textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }, [textAreaRef]);

    return (
      <TextAreaBase
        {...props}
        data-testid="text-input"
        id="text-input"
        onChange={(e) =>
          props.onChange ??
          (setInput &&
            setInput((prevInput) => ({ ...prevInput, text: e.target.value })))
        }
        placeholder={
          props.placeholder ?? isFirstMessage
            ? 'Ask anything...'
            : 'Message Raven'
        }
        ref={(node) => {
          textAreaRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        autoFocus
      />
    );
  }
);

const InputContainer = withBaseElementProps(View, {
  className: `${FIELD_BLOCK}__input-container`,
});

const isConversationInputWithText = (
  input?: ConversationInput
): input is Pick<Required<ConversationInput>, 'text'> => !!input?.text;

const isConversationInputWithFiles = (
  input?: ConversationInput
): input is Pick<Required<ConversationInput>, 'files'> =>
  !!input?.files?.length;

export const FormControl: FormControl = () => {
  const { input, setInput, error, setError } = React.useContext(
    ConversationInputContext
  );
  const handleSendMessage = React.useContext(SendMessageContext);
  const { allowAttachments, maxAttachmentSize, maxAttachments } =
    React.useContext(AttachmentContext);
  const displayText = useConversationDisplayText();
  const responseComponents = React.useContext(ResponseComponentsContext);
  const isLoading = React.useContext(LoadingContext);
  const aiContext = React.useContext(AIContextContext);
  const ref = React.useRef<HTMLFormElement | null>(null);
  const controls = React.useContext(ControlsContext);
  const [composing, setComposing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isInputText = isConversationInputWithText(input);
  // an empty array will resolve false when evaluating the length
  const isInputFiles = isConversationInputWithFiles(input);

  const submitMessage = async () => {
    const hasInput = isInputFiles || isInputText;
    // Prevent double submission and empty submission
    if (isSubmitting || !hasInput) {
      return;
    }

    setIsSubmitting(true);

    const submittedContent: InputContent[] = [];
    if (isInputText) {
      const textContent: InputContent = {
        text: input.text,
      };
      submittedContent.push(textContent);
    }

    if (isInputFiles) {
      for (const file of input.files) {
        const buffer = await file.arrayBuffer();
        const format = getAttachmentFormat(file);
        const source = { bytes: new Uint8Array(buffer) };
        if (isDocumentFormat(format)) {
          submittedContent.push({
            document: {
              name: getValidDocumentName(file),
              format,
              source,
            },
          });
        } else if (isImageFormat(format)) {
          submittedContent.push({
            image: {
              format,
              source,
            },
          });
        }
      }
    }

    if (handleSendMessage) {
      handleSendMessage({
        content: submittedContent,
        aiContext: isFunction(aiContext) ? aiContext() : undefined,
        toolConfiguration:
          convertResponseComponentsToToolConfiguration(responseComponents),
      });
    }

    // Clear the attachment errors when submitting
    // because the errors are not actually preventing the submission
    // but rather notifying the user that certain files were not attached and why they weren't
    setError?.(undefined);
    setIsSubmitting(false);
    ref.current?.reset();
    if (setInput) setInput({ text: '', files: [] });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage();
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const { key, shiftKey } = event;

    if (key === 'Enter' && !shiftKey && !composing) {
      event.preventDefault();

      submitMessage();
    }
  };

  const onValidate = React.useCallback(
    async (files: File[]) => {
      const previousFiles = input?.files ?? [];
      const {
        acceptedFiles,
        hasMaxAttachmentsError,
        hasMaxAttachmentSizeError,
        hasUnsupportedFileError,
      } = await attachmentsValidator({
        files: [...files, ...previousFiles],
        maxAttachments,
        maxAttachmentSize,
      });

      if (
        hasMaxAttachmentsError ||
        hasMaxAttachmentSizeError ||
        hasUnsupportedFileError
      ) {
        const errors = [];
        if (hasMaxAttachmentsError) {
          errors.push(displayText.getMaxAttachmentErrorText(maxAttachments));
        }
        if (hasUnsupportedFileError) {
          errors.push(
            displayText.getAttachmentFormatErrorText([...validFileTypes])
          );
        }
        if (hasMaxAttachmentSizeError) {
          errors.push(
            displayText.getAttachmentSizeErrorText(
              // base64 size is about 137% that of the file size
              // https://en.wikipedia.org/wiki/Base64#MIME
              humanFileSize((maxAttachmentSize - 814) / 1.37, true)
            )
          );
        }
        setError?.(errors.join(' '));
      } else {
        setError?.(undefined);
      }

      setInput?.((prevValue) => ({
        ...prevValue,
        files: acceptedFiles,
      }));
    },
    [setInput, input, displayText, maxAttachmentSize, maxAttachments, setError]
  );

  if (controls?.Form) {
    return (
      <controls.Form
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
        onValidate={onValidate}
        allowAttachments={allowAttachments}
        isLoading={isLoading ?? isSubmitting}
        error={error}
        setError={setError}
      />
    );
  }

  return (
    <form
      className={`${FIELD_BLOCK}__form`}
      onSubmit={handleSubmit}
      method="post"
      ref={ref}
    >
      {allowAttachments ? <AttachFileControl /> : null}
      <InputContainer>
        <VisuallyHidden>
          <Label />
        </VisuallyHidden>
        <TextInput
          onKeyDown={handleOnKeyDown}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
        />
        <AttachmentListControl />
      </InputContainer>
      <SendButton>
        <SendIcon />
      </SendButton>
    </form>
  );
};

FormControl.AttachFile = AttachFileControl;
FormControl.InputContainer = InputContainer;
FormControl.Label = Label;
FormControl.TextInput = TextInput;
FormControl.SendButton = SendButton;
FormControl.SendIcon = SendIcon;

export interface FormControl {
  (): React.JSX.Element;
  AttachFile: AttachFileControl;
  InputContainer: AIConversationElements['View'];
  Label: AIConversationElements['Label'];
  TextInput: AIConversationElements['TextArea'];
  SendButton: AIConversationElements['Button'];
  SendIcon: AIConversationElements['Icon'];
}
