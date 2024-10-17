import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import {
  AIConversationElements,
  ConversationInputContext,
  MessagesContext,
  SuggestedPromptsContext,
} from '../../context';
import { classNames } from '@aws-amplify/ui';
import { ControlsContext } from '../../context/ControlsContext';

const { View, Button, Text } = AIConversationElements;

const PROMPT_BLOCK = 'ai-prompts';
const PROMPT_CONTROL = `${PROMPT_BLOCK}__prompt`;
const PROMPT_CARD = `${PROMPT_CONTROL}__card`;

const PromptCard = withBaseElementProps(Button, {
  className: PROMPT_CARD,
  type: 'button',
});

const PromptGroupBase = withBaseElementProps(View, {
  className: `${PROMPT_CONTROL}__buttongroup`,
});

const PromptGroup: typeof PromptGroupBase = React.forwardRef(
  function ButtonGroup(props, ref) {
    const suggestedPromptsArray = React.useContext(SuggestedPromptsContext);
    const { setInput } = React.useContext(ConversationInputContext);

    if (!suggestedPromptsArray) {
      return;
    }

    return (
      <PromptGroupBase {...props} ref={ref}>
        {suggestedPromptsArray.map((prompt, index) => {
          return (
            <PromptCard
              key={index}
              aria-label={prompt.inputText}
              onClick={() =>
                setInput &&
                setInput((prevInput) => ({
                  ...prevInput,
                  text: prompt.inputText,
                }))
              }
            >
              <Text
                className={classNames(
                  `${PROMPT_CARD}__header`,
                  `${PROMPT_CARD}__text`
                )}
              >
                {prompt.header}
              </Text>
              <Text className={`${PROMPT_CARD}__text`}>{prompt.inputText}</Text>
            </PromptCard>
          );
        })}
      </PromptGroupBase>
    );
  }
);

const Container = withBaseElementProps(View, {
  className: `${PROMPT_BLOCK}__container`,
});

export const PromptControl: PromptControl = () => {
  const suggestedPromptsArray = React.useContext(SuggestedPromptsContext);
  const controls = React.useContext(ControlsContext);
  const { setInput } = React.useContext(ConversationInputContext);

  if (controls?.PromptList) {
    return (
      <controls.PromptList
        setInput={setInput}
        suggestedPrompts={suggestedPromptsArray}
      />
    );
  }

  return (
    <Container>
      <PromptGroup />
    </Container>
  );
};

export const AutoHidablePromptControl = (): JSX.Element | undefined => {
  const messages = React.useContext(MessagesContext);

  if (!messages || messages.length === 0) {
    return <PromptControl />;
  }
};

PromptControl.Container = Container;
PromptControl.PromptGroup = PromptGroup;
PromptControl.PromptCard = PromptCard;

export interface PromptControl {
  (): React.JSX.Element;
  Container: AIConversationElements['View'];
  PromptGroup: AIConversationElements['View'];
  PromptCard: AIConversationElements['Button'];
}
