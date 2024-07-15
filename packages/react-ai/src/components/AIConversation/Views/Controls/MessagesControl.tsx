import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { Avatars, CustomAction, Message as MessageType } from '../../types';

import { AIConversationElements } from '../../context/elements';
import { convertBufferToBase64, formatDate } from '../../utils';
import { ActionsBarControl } from './ActionsBarControl';
import { AvatarControl } from './AvatarControl';

const { Image, Text, View } = AIConversationElements;

const MESSAGES_BLOCK = 'ai-messages';
const MESSAGE_BLOCK = 'ai-message';

const MediaContent = withBaseElementProps(Image, {
  className: `${MESSAGE_BLOCK}__image`,
});

const TextContent = withBaseElementProps(Text, {
  className: `${MESSAGE_BLOCK}__text`,
});

const Timestamp = withBaseElementProps(Text, {
  className: `${MESSAGE_BLOCK}__timestamp`,
});

const MessageControl: MessageControl = ({ message }) => {
  return message.content.type === 'text' ? (
    <TextContent>{message.content.value}</TextContent>
  ) : (
    <MediaContent
      src={convertBufferToBase64(
        message.content.value.bytes,
        message.content.value.format
      )}
    ></MediaContent>
  );
};

MessageControl.MediaContent = MediaContent;
MessageControl.TextContent = TextContent;
interface MessageControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: { message: MessageType }): JSX.Element;
  MediaContent: T['Image'];
  TextContent: T['Text'];
}

const Container = withBaseElementProps(View, {
  className: `${MESSAGE_BLOCK}__container`,
});

const Layout = withBaseElementProps(View, {
  className: `${MESSAGES_BLOCK}__container`,
});

export const MessagesControl: MessagesControl = ({
  actions,
  avatars,
  messages,
}) => {
  return (
    <Layout>
      {messages.map((message, index) => (
        <Container key={index}>
          <AvatarControl
            avatar={message.role === 'user' ? avatars.user : avatars.ai}
          />
          <Timestamp>{formatDate(message.timestamp)}</Timestamp>
          <MessageControl message={message} />
          <ActionsBarControl actions={actions} message={message} />
        </Container>
      ))}
    </Layout>
  );
};

MessagesControl.ActionsBar = ActionsBarControl;
MessagesControl.Avatar = AvatarControl;
MessagesControl.Container = Container;
MessagesControl.Layout = Layout;
MessagesControl.Message = MessageControl;

export interface MessagesControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: {
    actions: CustomAction[];
    avatars: Avatars;
    messages: MessageType[];
    variant?: 'bubble-1' | 'bubble-2' | 'background' | 'default'
  }): JSX.Element;
  ActionsBar: ActionsBarControl<T>;
  Avatar: AvatarControl<T>;
  Container: T['View'];
  Layout: T['View'];
  Message: MessageControl<T>;
}
