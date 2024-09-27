import * as React from 'react';
import { Avatar, Text, View } from '@aws-amplify/ui-react';
import { MessageControl } from '../Controls/MessagesControl';
import {
  AvatarsContext,
  MessageVariantContext,
  RESPONSE_COMPONENT_PREFIX,
  RoleContext,
  useConversationDisplayText,
} from '../../context';
import { ConversationMessage } from '../../../../types';
import { ControlsContextProps } from '../../context/ControlsContext';
import {
  ComponentClassName,
  classNameModifier,
  classNames,
} from '@aws-amplify/ui';
import { LoadingContext } from '../../context/LoadingContext';

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

const LoadingMessage = () => {
  const avatars = React.useContext(AvatarsContext);
  const variant = React.useContext(MessageVariantContext);
  const avatar = avatars?.ai;

  return (
    <View
      className={classNames(
        ComponentClassName.AIConversationMessage,
        classNameModifier(ComponentClassName.AIConversationMessage, variant),
        classNameModifier(ComponentClassName.AIConversationMessage, 'assistant')
      )}
    >
      <View className={ComponentClassName.AIConversationMessageAvatar}>
        <Avatar isLoading>{avatar?.avatar}</Avatar>
      </View>
      <View className={ComponentClassName.AIConversationMessageBody}>
        <View className={ComponentClassName.AIConversationMessageSender}>
          <Text
            className={ComponentClassName.AIConversationMessageSenderUsername}
          >
            {avatar?.username}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Message = ({ message }: { message: ConversationMessage }) => {
  const avatars = React.useContext(AvatarsContext);
  const variant = React.useContext(MessageVariantContext);

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
          <Avatar>{avatar?.avatar}</Avatar>
        </View>
        <View className={ComponentClassName.AIConversationMessageBody}>
          <MessageMeta message={message} />
          <View className={ComponentClassName.AIConversationMessageContent}>
            <MessageControl message={message} />
          </View>
        </View>
      </View>
    </RoleContext.Provider>
  );
};

export const MessageList: ControlsContextProps['MessageList'] = ({
  messages,
}) => {
  const isLoading = React.useContext(LoadingContext);
  const messagesWithRenderableContent =
    messages?.filter((message) =>
      message.content.some(
        (content) =>
          content.image ??
          content.text ??
          content.toolUse?.name.startsWith(RESPONSE_COMPONENT_PREFIX)
      )
    ) ?? [];

  return (
    <View className={ComponentClassName.AIConversationMessageList}>
      {messagesWithRenderableContent.map((message, i) => (
        <Message key={`message-${i}`} message={message} />
      ))}
      {isLoading ? <LoadingMessage /> : null}
    </View>
  );
};
