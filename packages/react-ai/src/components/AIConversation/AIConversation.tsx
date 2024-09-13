import * as React from 'react';
import { Flex, ScrollView, Text, TextProps } from '@aws-amplify/ui-react';
import {
  IconAssistant,
  IconUser,
  useIcons,
} from '@aws-amplify/ui-react/internal';
import { AIConversationInput, AIConversationProps, Avatars } from './types';
import { MessagesControl } from './views/Controls/MessagesControl';
import { FieldControl } from './views';
import { MessageList } from './views/default/MessageList';
import { Form } from './views/default/Form';
import { PromptList } from './views/default/PromptList';
import { AutoHidablePromptControl } from './views/Controls';
import { ComponentClassName } from '@aws-amplify/ui';
import createProvider from './createProvider';

interface AIConversationBaseProps
  extends AIConversationProps,
    AIConversationInput {}

function AIConversationBase({
  actions,
  avatars,
  controls,
  handleSendMessage,
  messages,
  responseComponents,
  suggestedPrompts,
  variant,
  isLoading,
  displayText,
}: AIConversationBaseProps): JSX.Element {
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

  const Provider = createProvider({
    elements: {
      Text: React.forwardRef<HTMLParagraphElement, TextProps>(
        function _Text(props, ref) {
          return <Text {...props} ref={ref} />;
        }
      ),
    },
    actions,
    suggestedPrompts,
    responseComponents,
    variant,
    controls: {
      MessageList,
      PromptList,
      Form,
      ...controls,
    },
    displayText,
  });

  const providerProps = {
    messages,
    handleSendMessage,
    avatars: {
      ...defaultAvatars,
      ...avatars,
    },
    isLoading,
  };

  return (
    <Provider {...providerProps}>
      <Flex className={ComponentClassName.AIConversation}>
        <ScrollView autoScroll="smooth" flex="1">
          <AutoHidablePromptControl />
          <MessagesControl />
        </ScrollView>
        <FieldControl />
      </Flex>
    </Provider>
  );
}

/**
 * @experimental
 */
export const AIConversation = Object.assign(AIConversationBase, {
  MessageList,
  PromptList,
  Form,
});
