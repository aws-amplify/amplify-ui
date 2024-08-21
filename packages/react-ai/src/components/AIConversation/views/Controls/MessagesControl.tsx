import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import {
  MessagesContext,
  MessageVariantContext,
  RoleContext,
} from '../../context';
import { AIConversationElements } from '../../context/elements';
import { convertBufferToBase64, formatDate } from '../../utils';
import { ActionsBarControl } from './ActionsBarControl';
import { AvatarControl } from './AvatarControl';
import { ConversationMessage } from '../../../../types';
import { ResponseComponentsContext } from '../../context/ResponseComponentsContext';

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
    return <Text {...props} ref={ref} className={`${MESSAGE_BLOCK}__text`} />;
  }
);

const ContentContainer: typeof View = React.forwardRef(
  function ContentContainer(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    return (
      <View
        data-testid={'content'}
        {...props}
        ref={ref}
        className={`${MESSAGE_BLOCK}__content ${MESSAGE_BLOCK}__content--${variant}`}
      />
    );
  }
);

export const MessageControl: MessageControl = ({ message }) => {
  const responseComponents = React.useContext(ResponseComponentsContext);
  return (
    <ContentContainer>
      {message.content.map((content, index) => {
        if (content.text) {
          return (
            <TextContent data-testid={'text-content'} key={index}>
              {content.text}
            </TextContent>
          );
        } else if (content.image) {
          return (
            <MediaContent
              data-testid={'image-content'}
              key={index}
              src={convertBufferToBase64(
                content.image?.source.bytes,
                content.image?.format
              )}
            ></MediaContent>
          );
        } else if (content.toolUse) {
          // For now tool use is limited to custom response components
          const { name, input } = content.toolUse;
          if (!responseComponents || !name) {
            return;
          } else {
            const response = responseComponents[name];
            const CustomComponent = response.component;
            return <CustomComponent {...(input as object)} key={index} />;
          }
        }
      })}
    </ContentContainer>
  );
};

MessageControl.Container = ContentContainer;
MessageControl.MediaContent = MediaContent;
MessageControl.TextContent = TextContent;
interface MessageControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: { message: ConversationMessage }): JSX.Element;
  Container: T['View'];
  MediaContent: T['Image'];
  TextContent: T['Text'];
}

const Separator = withBaseElementProps(Span, {
  'aria-hidden': true,
  children: '|',
  className: `${MESSAGE_BLOCK}__separator`,
});

const Timestamp = withBaseElementProps(Text, {
  className: `${MESSAGE_BLOCK}__timestamp`,
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
        className={`${MESSAGE_BLOCK} ${MESSAGE_BLOCK}--${variant} ${MESSAGE_BLOCK}--${role}`}
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
  const messagesRef = React.useRef<(HTMLDivElement | null)[]>([]);

  const [focusedItemIndex, setFocusedItemIndex] = React.useState(
    messages ? messages.length - 1 : 0
  );
  const handleFocus = (index: number) => setFocusedItemIndex(index);

  const onKeyDown = React.useCallback(
    (index: number, { key }: React.KeyboardEvent<HTMLDivElement>) => {
      let newIndex;
      switch (key) {
        case 'ArrowUp':
          newIndex = Math.max(0, index - 1);
          setFocusedItemIndex(newIndex);
          messagesRef.current[newIndex]?.focus();
          break;
        case 'ArrowDown':
          newIndex = Math.min(index + 1, messages!.length - 1);
          setFocusedItemIndex(newIndex);
          messagesRef.current[newIndex]?.focus();
          break;
        case 'Home':
          newIndex = 0;
          setFocusedItemIndex(newIndex);
          messagesRef.current[newIndex]?.focus();
          break;
        case 'End':
          newIndex = messages!.length - 1;
          setFocusedItemIndex(newIndex);
          messagesRef.current[newIndex]?.focus();
          break;
        default: {
          break;
        }
      }

      return;
    },
    [messages]
  );

  return (
    <Layout>
      {messages?.map((message, index) => {
        return renderMessage ? (
          renderMessage(message)
        ) : (
          <RoleContext.Provider value={message.role} key={`message-${index}`}>
            <MessageContainer
              data-testid={`message`}
              key={`message-${index}`}
              tabIndex={focusedItemIndex === index ? 0 : -1}
              onFocus={() => handleFocus(index)}
              onKeyDown={(event) => onKeyDown(index, event)}
              ref={(el) => (messagesRef.current[index] = el)}
            >
              <HeaderContainer>
                <AvatarControl />
                <Separator />
                <Timestamp>{formatDate(new Date(message.createdAt))}</Timestamp>
              </HeaderContainer>
              <MessageControl message={message} />
              {message.role === 'assistant' ? (
                <ActionsBarControl
                  message={message}
                  focusable={focusedItemIndex === index}
                />
              ) : null}
            </MessageContainer>
          </RoleContext.Provider>
        );
      })}
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
