import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { ConversationMessage, MessageVariant } from '../../types';

import { MessagesContext } from '../../context';
import { AIConversationElements } from '../../context/elements';
import { convertBufferToBase64, formatDate } from '../../utils';
import { ActionsBarControl } from './ActionsBarControl';
import { AvatarControl } from './AvatarControl';

const { Image, Span, Text, View } = AIConversationElements;

const MESSAGES_BLOCK = 'ai-messages';
const MESSAGE_BLOCK = 'ai-message';

const MediaContent = withBaseElementProps(Image, {
  className: `${MESSAGE_BLOCK}__image`,
  alt: 'Image attachment',
});

const TextContent = withBaseElementProps(Text, {
  className: `${MESSAGE_BLOCK}__text`,
});

const Timestamp = withBaseElementProps(Text, {
  className: `${MESSAGE_BLOCK}__timestamp`,
});

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
  (props: {
    message: ConversationMessage;
    variant?: MessageVariant;
  }): JSX.Element;
  MediaContent: T['Image'];
  TextContent: T['Text'];
}

const HeaderContainer = withBaseElementProps(View, {
  className: `${MESSAGE_BLOCK}__header__container`,
});

const Separator = withBaseElementProps(Span, {
  'aria-hidden': true,
  className: `${MESSAGE_BLOCK}__separator`,
  children: '|',
});

const Container = withBaseElementProps(View, {
  className: `${MESSAGE_BLOCK}__container`,
});

const Layout = withBaseElementProps(View, {
  className: `${MESSAGES_BLOCK}__container`,
});

export const MessagesControl: MessagesControl = ({
  renderMessage,
  variant = 'borderless',
}) => {
  const messages = React.useContext(MessagesContext);
  const messagesRef = React.useRef<(HTMLDivElement | null)[]>([]);

  const [focusedItemIndex, setFocusedItemIndex] = React.useState(
    messages ? messages.length - 1 : 0
  );
  const handleFocus = (index: number) => setFocusedItemIndex(index);

  const onKeyDown = React.useCallback(
    (index: number, { key }: React.KeyboardEvent<HTMLDivElement>) => {
      let newIndex = focusedItemIndex;
      switch (key) {
        case 'ArrowUp':
          newIndex = Math.max(0, index - 1);
          setFocusedItemIndex(newIndex);
          break;
        case 'ArrowDown':
          newIndex = Math.min(index + 1, messages!.length - 1);
          setFocusedItemIndex(newIndex);
          break;
        case 'Home':
          newIndex = 0;
          setFocusedItemIndex(newIndex);
          break;
        case 'End':
          newIndex = messages!.length - 1;
          setFocusedItemIndex(newIndex);
          break;
        default: {
          break;
        }
      }

      messagesRef.current[newIndex]?.focus();
      return;
    },
    [messages, focusedItemIndex]
  );

  return (
    <Layout>
      {messages?.map((message, index) =>
        renderMessage ? (
          renderMessage(message)
        ) : (
          <Container
            data-testid={`message`}
            key={`message-${index}`}
            tabIndex={focusedItemIndex === index ? 0 : -1}
            onFocus={() => handleFocus(index)}
            onKeyDown={(event) => onKeyDown(index, event)}
            ref={(el) => (messagesRef.current[index] = el)}
          >
            <HeaderContainer>
              <AvatarControl message={message} />
              <Separator />
              <Timestamp>{formatDate(message.timestamp)}</Timestamp>
            </HeaderContainer>
            <MessageControl message={message} variant={variant} />
            <ActionsBarControl message={message} />
          </Container>
        )
      )}
    </Layout>
  );
};

MessagesControl.ActionsBar = ActionsBarControl;
MessagesControl.Avatar = AvatarControl;
MessagesControl.Container = Container;
MessagesControl.HeaderContainer = HeaderContainer;
MessagesControl.Layout = Layout;
MessagesControl.Message = MessageControl;
MessagesControl.Separator = Separator;

export interface MessagesControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: {
    variant?: MessageVariant;
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
