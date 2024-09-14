import * as React from 'react';
import { Flex, Button } from '@aws-amplify/ui-react';

import { ControlsContextProps } from '../../context/ControlsContext';
import { ComponentClassName } from '@aws-amplify/ui';

export const PromptList: ControlsContextProps['PromptList'] = ({
  setInput,
  suggestedPrompts = [],
}) => {
  return (
    <Flex>
      {suggestedPrompts.map((prompt) => {
        return (
          <Button
            className={ComponentClassName.AIConversationPrompt}
            key={prompt.inputText}
            onClick={() => {
              setInput?.((prevInput) => ({
                ...prevInput,
                text: prompt.inputText,
              }));
            }}
          >
            {prompt.header}
          </Button>
        );
      })}
    </Flex>
  );
};
