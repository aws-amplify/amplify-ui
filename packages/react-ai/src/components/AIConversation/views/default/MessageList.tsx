import * as React from 'react';
import { Avatar, Text, View } from '@aws-amplify/ui-react';
import { MessageControl } from '../Controls/MessagesControl';
import {
  AvatarsContext,
  MessageVariantContext,
  RoleContext,
} from '../../context';
import { ConversationMessage } from '../../../../types';
import { formatDate } from '../../utils';
import { ControlsContextProps } from '../../context/ControlsContext';
import {
  ComponentClassName,
  classNameModifier,
  classNames,
} from '@aws-amplify/ui';

const MessageMeta = ({ message }: { message: ConversationMessage }) => {
  // need to pass this in as props in order for it to be overridable
  const avatars = React.useContext(AvatarsContext);
  const role = React.useContext(RoleContext);
  // maybe rename 'avatar' to something else
  const avatar = role === 'assistant' ? avatars?.ai : avatars?.user;
  return (
    <View className={ComponentClassName.AIConversationMessageSender}>
      <Text className={ComponentClassName.AIConversationMessageSenderUsername}>
        {avatar?.username}
      </Text>
      <Text className={ComponentClassName.AIConversationMessageSenderTimestamp}>
        {formatDate(new Date(message.createdAt))}
      </Text>
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
  return (
    <View className={ComponentClassName.AIConversationMessageList}>
      {messages.map((message, i) => (
        <Message key={`message-${i}`} message={message} />
      ))}
    </View>
  );
};
