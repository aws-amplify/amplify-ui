import * as React from 'react';
import { Flex, ScrollView, Text } from '@aws-amplify/ui-react';
import {
  IconAssistant,
  IconUser,
  useIcons,
} from '@aws-amplify/ui-react/internal';
import { createAIConversation } from './createAIConversation';
import { AIConversationInput, AIConversationProps, Avatars } from './types';
import { MessagesControl } from './views/Controls/MessagesControl';
import { FieldControl } from './views';
import { MessageList } from './views/default/Messages';
import { Form } from './views/default/Form';
import { SuggestionList } from './views/default/SuggestionList';
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
    elements: {
      Text: (props) => {
        return <Text {...props} />;
      },
    },
    controls: {
      MessageList,
      SuggestionList,
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
      <Flex
        className={ComponentClassName.AIConversation}
        direction="column"
        height="100%"
      >
        <ScrollView autoScroll="smooth" flex="1">
          <AutoHidablePromptControl />
          <MessagesControl />
        </ScrollView>
        <FieldControl />
      </Flex>
    </AIConversation.Provider>
  );
};
