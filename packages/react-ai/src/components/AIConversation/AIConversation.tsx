import * as React from 'react';
import { Flex, ScrollView, Text } from '@aws-amplify/ui-react';
import {
  IconAssistant,
  IconUser,
  useIcons,
} from '@aws-amplify/ui-react/internal';
import {
  AIConversation as AIConversationType,
  AIConversationInput,
  AIConversationProps,
  Avatars,
} from './types';
import { MessagesControl } from './views/Controls/MessagesControl';
import { FormControl } from './views/Controls/FormControl';
import { MessageList } from './views/default/MessageList';
import { Form } from './views/default/Form';
import { PromptList } from './views/default/PromptList';
import { ComponentClassName } from '@aws-amplify/ui';
import {
  AIConversationProvider,
  AIConversationProviderProps,
} from './AIConversationProvider';
import { useSetUserAgent } from '@aws-amplify/ui-react-core';
import { VERSION } from '../../version';
import { DefaultMessageControl } from './views/Controls/DefaultMessageControl';

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
  messageRenderer,
  children,
}: AIConversationProviderProps): JSX.Element {
  useSetUserAgent({
    componentName: 'AIConversation',
    packageName: 'react-ai',
    version: VERSION,
  });

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
    messageRenderer,
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
        <ScrollView autoScroll="smooth" flex="1">
          <DefaultMessageControl />
          <MessagesControl />
        </ScrollView>
        <FormControl />
      </Flex>
    </Provider>
  );
}

/**
 * @experimental
 */
export const AIConversation: AIConversationType<AIConversationBaseProps> =
  Object.assign(AIConversationBase, {
    Provider,
    DefaultMessage: DefaultMessageControl,
    Messages: MessagesControl,
    Form: FormControl,
  });
