import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { ConversationMessage } from '../../types';

import {
  MessagesContext,
  MessageVariantContext,
  RoleContext,
} from '../../context';
import { AIConversationElements } from '../../context/elements';
import { convertBufferToBase64, formatDate } from '../../utils';
import { ActionsBarControl } from './ActionsBarControl';
import { AvatarControl } from './AvatarControl';

const { Image, Span, Text, View } = AIConversationElements;

const MESSAGES_BLOCK = 'ai-messages';
const MESSAGE_BLOCK = 'ai-message';

const MediaContentBase = withBaseElementProps(Image, {
  alt: 'Image attachment',
});

const MediaContent: typeof MediaContentBase = React.forwardRef(
  function MediaContent(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    const role = React.useContext(RoleContext);
    return (
      <MediaContentBase
        {...props}
        ref={ref}
        className={`${MESSAGE_BLOCK}__image ${MESSAGE_BLOCK}__image--${variant} ${MESSAGE_BLOCK}__image--${role}`}
      />
    );
  }
);

const TextContent: typeof Text = React.forwardRef(
  function TextContent(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    const role = React.useContext(RoleContext);
    return (
      <Text
        {...props}
        ref={ref}
        className={`${MESSAGE_BLOCK}__text ${MESSAGE_BLOCK}__text--${variant} ${MESSAGE_BLOCK}__text--${role}`}
      />
    );
  }
);

const Timestamp = withBaseElementProps(Text, {
  className: `${MESSAGE_BLOCK}__timestamp`,
});

// TODO: update this when we integration with response components
// export const ResponseComponentControl = (): React.ReactNode => {
//   const responseComponents = React.useContext(ResponseComponentsContext)

//   if (responseComponents && toolUseId) {
//     const toolUseId: string = 'componentName';
//     const ComponentToRender = responseComponents[toolUseId];

//     return <ComponentToRender />
//   }
//   return;
// };

export const MessageControl: MessageControl = ({ message }) => {
  return message.content.type === 'text' ? (
    <TextContent data-testid={'message-text'}>
      {message.content.value}
    </TextContent>
  ) : (
    <MediaContent
      data-testid={'message-image'}
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
  (props: { message: ConversationMessage }): JSX.Element;
  MediaContent: T['Image'];
  TextContent: T['Text'];
}

const Separator = withBaseElementProps(Span, {
  'aria-hidden': true,
  children: '|',
  className: `${MESSAGE_BLOCK}__separator`,
});

const HeaderContainer: typeof View = React.forwardRef(
  function HeaderContainer(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    return (
      <View
        {...props}
        ref={ref}
        className={`${MESSAGE_BLOCK}__header__container ${MESSAGE_BLOCK}__header__container--${variant}`}
      />
    );
  }
);

const MessageContainer: typeof View = React.forwardRef(
  function MessageContainer(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    const role = React.useContext(RoleContext);
    return (
      <View
        {...props}
        ref={ref}
        className={`${MESSAGE_BLOCK}__container ${MESSAGE_BLOCK}__container--${variant} ${MESSAGE_BLOCK}__container--${role}`}
      />
    );
  }
);

const Layout: typeof View = React.forwardRef(function Layout(props, ref) {
  const variant = React.useContext(MessageVariantContext);
  return (
    <View
      {...props}
      ref={ref}
      className={`${MESSAGES_BLOCK}__container ${MESSAGES_BLOCK}__container--${variant}`}
    />
  );
});

export const MessagesControl: MessagesControl = ({ renderMessage }) => {
  const messages = React.useContext(MessagesContext);
  return (
    <Layout>
      {messages?.map((message, index) =>
        renderMessage ? (
          renderMessage(message)
        ) : (
          <RoleContext.Provider value={message.role} key={`message-${index}`}>
            <MessageContainer data-testid={`message`} key={`message-${index}`}>
              <HeaderContainer>
                <AvatarControl />
                <Separator />
                <Timestamp>{formatDate(message.timestamp)}</Timestamp>
              </HeaderContainer>
              <MessageControl message={message} />
              <ActionsBarControl message={message} />
            </MessageContainer>
          </RoleContext.Provider>
        )
      )}
    </Layout>
  );
};

MessagesControl.ActionsBar = ActionsBarControl;
MessagesControl.Avatar = AvatarControl;
MessagesControl.Container = MessageContainer;
MessagesControl.HeaderContainer = HeaderContainer;
MessagesControl.Layout = Layout;
MessagesControl.Message = MessageControl;
MessagesControl.Separator = Separator;

export interface MessagesControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: {
    renderMessage?: (message: ConversationMessage) => React.ReactNode;
  }): JSX.Element;
  ActionsBar: ActionsBarControl<T>;
  Avatar: AvatarControl<T>;
  Container: T['View'];
  HeaderContainer: T['View'];
  Layout: T['View'];
  Message: MessageControl<T>;
  Separator: T['Span'];
}
