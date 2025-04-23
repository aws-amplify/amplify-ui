import * as React from 'react';
import { Flex, ScrollView } from '@aws-amplify/ui-react';
import {
  IconAssistant,
  IconUser,
  useIcons,
} from '@aws-amplify/ui-react/internal';
import type {
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
import { AIConversationProvider } from './AIConversationProvider';
import { useSetUserAgent } from '@aws-amplify/ui-react-core';
import { VERSION } from '../../version';
import { DefaultMessageControl } from './views/Controls/DefaultMessageControl';

interface AIConversationBaseProps
  extends AIConversationProps,
    AIConversationInput {}

function AIConversationBase({
  avatars,
  controls,
  ...rest
}: AIConversationBaseProps): React.JSX.Element {
  useSetUserAgent({
    componentName: 'AIConversation',
    packageName: 'react-ai',
    version: VERSION,
  });

  const icons = useIcons('aiConversation');
  const defaultAvatars: Avatars = {
    ai: {
      username: 'Assistant',
      avatar: icons?.assistant ?? <IconAssistant testId="icon-assistant" />,
    },
    user: {
      username: 'User',
      avatar: icons?.user ?? <IconUser testId="icon-user" />,
    },
  };

  const providerProps = {
    ...rest,
    avatars: {
      ...defaultAvatars,
      ...avatars,
    },
    controls: {
      MessageList,
      PromptList,
      Form,
      ...controls,
    },
  };

  return (
    <AIConversationProvider {...providerProps}>
      <Flex
        className={ComponentClassName.AIConversation}
        testId="ai-conversation"
      >
        <ScrollView autoScroll="smooth" flex="1">
          <DefaultMessageControl />
          <MessagesControl />
        </ScrollView>
        <FormControl />
      </Flex>
    </AIConversationProvider>
  );
}

export const AIConversation: AIConversationType<AIConversationBaseProps> =
  Object.assign(AIConversationBase, {
    Provider: AIConversationProvider,
    DefaultMessage: DefaultMessageControl,
    Messages: MessagesControl,
    Form: FormControl,
  });
