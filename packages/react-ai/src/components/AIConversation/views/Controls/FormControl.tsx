import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { ConversationInputContext } from '../../context';
import { AIConversationElements } from '../../context/elements';
import { AttachFileControl } from './AttachFileControl';
import { MessagesContext } from '../../context';
import { AttachmentListControl } from './AttachmentListControl';
import { SendMessageContext } from '../../context/SendMessageContext';
import { ConversationMessageContent, InputContent } from '../../../../types';
import {
  convertResponseComponentsToToolConfiguration,
  ResponseComponentsContext,
} from '../../context/ResponseComponentsContext';
import { ControlsContext } from '../../context/ControlsContext';
import { getImageTypeFromMimeType } from '../../utils';
import { LoadingContext } from '../../context/LoadingContext';
import { AttachmentContext } from '../../context/AttachmentContext';

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

export const FormControl: FormControl = () => {
  const { input, setInput } = React.useContext(ConversationInputContext);
  const handleSendMessage = React.useContext(SendMessageContext);
  const allowAttachments = React.useContext(AttachmentContext);
  const ref = React.useRef<HTMLFormElement | null>(null);
  const responseComponents = React.useContext(ResponseComponentsContext);
  const controls = React.useContext(ControlsContext);
  const [composing, setComposing] = React.useState(false);

  const submitMessage = async () => {
    ref.current?.reset();
    const submittedContent: InputContent[] = [];
    if (input?.text) {
      const textContent: InputContent = {
        text: input.text,
      };
      submittedContent.push(textContent);
    }

    if (input?.files) {
      for (const file of input.files) {
        const buffer = await file.arrayBuffer();
        const fileContent: ConversationMessageContent = {
          image: {
            format: getImageTypeFromMimeType(file.type),
            source: { bytes: new Uint8Array(buffer) },
          },
        };
        submittedContent.push(fileContent);
      }
    }

    if (handleSendMessage) {
      handleSendMessage({
        content: submittedContent,
        toolConfiguration:
          convertResponseComponentsToToolConfiguration(responseComponents),
      });
    }
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

    if (key === 'Enter' && !shiftKey && !composing ) {
      event.preventDefault();

      const hasInput =
        !!input?.text || (input?.files?.length && input?.files?.length > 0);
      if (hasInput) {
        submitMessage();
      }
    }
  };

  if (controls?.Form) {
    return (
      <controls.Form
        handleSubmit={handleSubmit}
        input={input!}
        setInput={setInput!}
        allowAttachments={allowAttachments}
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
