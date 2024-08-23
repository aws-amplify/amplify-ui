import * as React from 'react';
import { Flex, Card } from '@aws-amplify/ui-react';

import { ControlsContextProps } from '../../context/ControlsContext';

export const SuggestionList: ControlsContextProps['SuggestionList'] = ({
  setInput,
  suggestedPrompts,
}) => {
  return (
    <Flex>
      {suggestedPrompts.map((prompt) => {
        return (
          <Card
            key={prompt.inputText}
            onClick={() => {
              setInput((prevInput) => ({
                ...prevInput,
                text: prompt.inputText,
              }));
            }}
          >
            {prompt.header}
          </Card>
        );
      })}
    </Flex>
  );
};
