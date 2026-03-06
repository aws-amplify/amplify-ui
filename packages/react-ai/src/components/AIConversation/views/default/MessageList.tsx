import * as React from 'react';
import { Avatar, Placeholder, Text, View, Button } from '@aws-amplify/ui-react';
import { MessageControl } from '../Controls/MessagesControl';
import {
  ActionsContext,
  AvatarsContext,
  MessageVariantContext,
  RESPONSE_COMPONENT_PREFIX,
  RoleContext,
  useConversationDisplayText,
} from '../../context';
import type { ConversationMessage } from '../../../../types';
import type { ControlsContextProps } from '../../context/ControlsContext';
import {
  ComponentClassName,
  classNameModifier,
  classNames,
} from '@aws-amplify/ui';
import { LoadingContext } from '../../context/LoadingContext';

const PlaceholderMessage = ({ role }: { role: string }) => {
  const variant = React.useContext(MessageVariantContext);
  return (
    <View
      className={classNames(
        ComponentClassName.AIConversationMessage,
        classNameModifier(ComponentClassName.AIConversationMessage, variant),
        classNameModifier(ComponentClassName.AIConversationMessage, role)
      )}
    >
      <View className={ComponentClassName.AIConversationMessageAvatar}>
        <Avatar />
      </View>
      <View className={ComponentClassName.AIConversationMessageBody}>
        <Placeholder width="25%" />
        <Placeholder width="50%" />
        <Placeholder width="25%" />
      </View>
    </View>
  );
};

const MessageMeta = ({ message }: { message: ConversationMessage }) => {
  // need to pass this in as props in order for it to be overridable
  const avatars = React.useContext(AvatarsContext);
  const role = React.useContext(RoleContext);
  const { getMessageTimestampText } = useConversationDisplayText();
  // maybe rename 'avatar' to something else
  const avatar = role === 'assistant' ? avatars?.ai : avatars?.user;
  return (
    <View className={ComponentClassName.AIConversationMessageSender}>
      <Text className={ComponentClassName.AIConversationMessageSenderUsername}>
        {avatar?.username}
      </Text>
      <Text className={ComponentClassName.AIConversationMessageSenderTimestamp}>
        {getMessageTimestampText(new Date(message.createdAt))}
      </Text>
    </View>
  );
};

const MessageActions = ({ message }: { message: ConversationMessage }) => {
  const actions = React.useContext(ActionsContext);
  if (!actions) return null;

  return (
    <View className={ComponentClassName.AIConversationMessageActions}>
      {actions.map((action, i) => {
        return (
          <Button
            key={i}
            size="small"
            onClick={() => {
              action.handler(message);
            }}
          >
            {action.component}
          </Button>
        );
      })}
    </View>
  );
};

const Message = ({ message }: { message: ConversationMessage }) => {
  const avatars = React.useContext(AvatarsContext);
  const variant = React.useContext(MessageVariantContext);
  const { isLoading } = message;

  const avatar = message.role === 'assistant' ? avatars?.ai : avatars?.user;
  return (
    <RoleContext.Provider value={message.role}>
      <View
        className={classNames(
          ComponentClassName.AIConversationMessage,
          classNameModifier(ComponentClassName.AIConversationMessage, variant),
          classNameModifier(
            ComponentClassName.AIConversationMessage,
            message.role
          )
        )}
      >
        <View className={ComponentClassName.AIConversationMessageAvatar}>
          <Avatar isLoading={isLoading}>{avatar?.avatar}</Avatar>
        </View>
        <View className={ComponentClassName.AIConversationMessageBody}>
          <MessageMeta message={message} />
          <View className={ComponentClassName.AIConversationMessageContent}>
            <MessageControl message={message} />
          </View>
          {message.role === 'assistant' ? (
            <MessageActions message={message} />
          ) : null}
        </View>
      </View>
    </RoleContext.Provider>
  );
};

export const MessageList: Required<ControlsContextProps>['MessageList'] = ({
  messages,
}) => {
  const isLoading = React.useContext(LoadingContext);
  const messagesWithRenderableContent =
    messages?.filter((message) =>
      message.content.some(
        (content) =>
          content.image ??
          content.text ??
          content.document ??
          content.toolUse?.name.startsWith(RESPONSE_COMPONENT_PREFIX)
      )
    ) ?? [];

  return (
    <View className={ComponentClassName.AIConversationMessageList}>
      {isLoading ? (
        <>
          <PlaceholderMessage role="user" />
          <PlaceholderMessage role="assistant" />
        </>
      ) : null}
      {messagesWithRenderableContent.map((message, i) => (
        <Message key={`message-${i}`} message={message} />
      ))}
    </View>
  );
};
