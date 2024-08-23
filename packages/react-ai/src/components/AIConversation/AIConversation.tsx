import * as React from 'react';
import { Flex, ScrollView, Text, TextProps } from '@aws-amplify/ui-react';
import {
  IconAssistant,
  IconUser,
  useIcons,
} from '@aws-amplify/ui-react/internal';
import { createAIConversation } from './createAIConversation';
import { AIConversationInput, AIConversationProps, Avatars } from './types';
import { MessagesControl } from './views/Controls/MessagesControl';
import { FieldControl } from './views';
import { MessageList } from './views/default/MessageList';
import { Form } from './views/default/Form';
import { PromptList } from './views/default/PromptList';
import { AutoHidablePromptControl } from './views/Controls';
import { ComponentClassName } from '@aws-amplify/ui';

interface _AIConversationProps
  extends AIConversationProps,
    AIConversationInput<{}> {}

export const AIConversation = ({
  messages,
  handleSendMessage,
  avatars,
  controls,
  responseComponents,
  suggestedPrompts,
  variant,
}: _AIConversationProps): JSX.Element => {
  const icons = useIcons('aiConversation');
  const defaultAvatars: Avatars = {
    ai: {
      username: 'Assistant',
      avatar: icons?.assistant ?? <IconAssistant />,
    },
    user: {
      username: 'User',
      avatar: icons?.user ?? <IconUser />,
    },
  };

  const { AIConversation } = createAIConversation({
    variant,
    suggestedPrompts,
    elements: {
      Text: React.forwardRef<HTMLParagraphElement, TextProps>(
        function _Text(props, ref) {
          return <Text {...props} ref={ref} />;
        }
      ),
    },
    controls: {
      MessageList,
      PromptList,
      Form,
      ...controls,
    },
    responseComponents,
  });

  const providerProps = {
    messages,
    handleSendMessage,
    avatars: {
      ...defaultAvatars,
      ...avatars,
    },
  };

  return (
    <AIConversation.Provider {...providerProps}>
      <Flex className={ComponentClassName.AIConversation}>
        <ScrollView autoScroll="smooth" flex="1">
          <AutoHidablePromptControl />
          <MessagesControl />
        </ScrollView>
        <FieldControl />
      </Flex>
    </AIConversation.Provider>
  );
};
