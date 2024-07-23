import React from 'react';

import { MessagesContext } from '../../context';
import { AIConversationElements } from '../../context/elements';
import { PromptControl } from './PromptControl';
import { FieldControl } from './FieldControl';
const { View } = AIConversationElements;

export const AutoHidablePromptControl = ({ onSelect }): JSX.Element | undefined => {
  const messages = React.useContext(MessagesContext);

  if (!messages || messages.length === 0) {
    return <PromptControl onSelect={onSelect}/>;
  }
};

export const FormControl: FormControl = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleTextTransfer = (text: string) => {
    console.log('text ', text)

    if (inputRef.current) {
      inputRef.current.value = text;
    }
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        console.log("Submitting form");
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log(Object.fromEntries(formData));
      }}
    >
      <View
        style={{
          borderLeft: '1px solid rgba(220, 222, 224, 1)',
          borderRight: '1px solid rgba(220, 222, 224, 1)',
          padding: '0px 16px',
        }}
      >
        <AutoHidablePromptControl onSelect={handleTextTransfer}/>
      </View>
      <View
        style={{
          border: '1px solid rgba(220, 222, 224, 1)',
          borderTop: 'none',
          borderRadius: '0px 0px 16px 16px',
          padding: '0px 16px',
        }}
      >
        <FieldControl inputRef={inputRef} />
      </View>
    </form>
  );
};

// FormControl.AutoHidablePromptControl = AutoHidablePromptControl;
FormControl.Field = FieldControl;
FormControl.PromptControl = PromptControl;

export interface FormControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): JSX.Element;
  //   AutoHidablePromptControl: JSX.Element | undefined;
  Field: FieldControl<T>;
  PromptControl: PromptControl<T>;
}
