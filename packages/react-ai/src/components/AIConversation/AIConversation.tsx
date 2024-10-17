import * as React from 'react';
import { Flex, ScrollView, Text } from '@aws-amplify/ui-react';
import {
  IconAssistant,
  IconUser,
  useIcons,
} from '@aws-amplify/ui-react/internal';
import { AIConversationInput, AIConversationProps, Avatars } from './types';
import { MessagesControl } from './views/Controls/MessagesControl';
import { FormControl } from './views/Controls/FormControl';
import { MessageList } from './views/default/MessageList';
import { Form } from './views/default/Form';
import { PromptList } from './views/default/PromptList';
import { AutoHidablePromptControl } from './views/Controls';
import { ComponentClassName } from '@aws-amplify/ui';
import { AIConversationProvider } from './AIConversationProvider';

function Provider({
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
  allowAttachments,
  children,
}: React.PropsWithChildren<AIConversationBaseProps>): React.JSX.Element {
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

  const providerProps = {
    messages,
    handleSendMessage,
    avatars: {
      ...defaultAvatars,
      ...avatars,
    },
    isLoading,
    elements: {
      Text,
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
    allowAttachments,
  };

  return (
    <AIConversationProvider {...providerProps}>
      {children}
    </AIConversationProvider>
  );
}

interface AIConversationBaseProps
  extends AIConversationProps,
    AIConversationInput {}

function AIConversationBase(props: AIConversationBaseProps): JSX.Element {
  return (
    <Provider {...props}>
      <Flex className={ComponentClassName.AIConversation}>
        {/* messages list view */}
        <ScrollView autoScroll="smooth" flex="1">
          <AutoHidablePromptControl />
          <MessagesControl />
        </ScrollView>
        {/* form view */}
        <FormControl />
      </Flex>
    </Provider>
  );
}

//

/**
 * @experimental
 */
export const AIConversation = Object.assign(AIConversationBase, {
  Provider,
  MessageHistory: MessagesControl,
  Form: FormControl,
});
