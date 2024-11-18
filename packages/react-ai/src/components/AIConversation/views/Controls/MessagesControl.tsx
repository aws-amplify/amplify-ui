import React from 'react';
import { Image } from '@aws-amplify/ui-react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import {
  FallbackComponentContext,
  MessageRendererContext,
  MessagesContext,
  MessageVariantContext,
  RoleContext,
  useConversationDisplayText,
} from '../../context';
import { AIConversationElements } from '../../context/elements';
import { convertBufferToBase64 } from '../../utils';
import { ActionsBarControl } from './ActionsBarControl';
import { AvatarControl } from './AvatarControl';
import { ConversationMessage } from '../../../../types';
import {
  RESPONSE_COMPONENT_PREFIX,
  ResponseComponentsContext,
} from '../../context/ResponseComponentsContext';
import { ControlsContext } from '../../context/ControlsContext';
import { ImageProps } from '@aws-amplify/ui-react';
import { classNames } from '@aws-amplify/ui';

const { Text, View } = AIConversationElements;

const MESSAGES_BLOCK = 'amplify-ai-conversation__message__list';
const MESSAGE_BLOCK = 'amplify-ai-conversation__message';

const MediaContent: React.ComponentType<ImageProps> = (props) => {
  const variant = React.useContext(MessageVariantContext);
  const role = React.useContext(RoleContext);
  return (
    <Image
      className={classNames(
        `${MESSAGE_BLOCK}__image`,
        variant && `${MESSAGE_BLOCK}__image--${variant}`,
        `${MESSAGE_BLOCK}__image--${role}`
      )}
      {...props}
    />
  );
};

const TextContent: typeof Text = React.forwardRef(
  function TextContent(props, ref) {
    return <Text ref={ref} className={`${MESSAGE_BLOCK}__text`} {...props} />;
  }
);

const ToolContent = ({
  toolUse,
}: {
  toolUse: NonNullable<ConversationMessage['content'][number]['toolUse']>;
}) => {
  const responseComponents = React.useContext(ResponseComponentsContext) ?? {};
  const FallbackComponent = React.useContext(FallbackComponentContext);

  // For now tool use is limited to custom response components
  const { name, input } = toolUse;

  if (!name || !name.startsWith(RESPONSE_COMPONENT_PREFIX)) {
    return;
  } else {
    const response = responseComponents[name];
    if (response) {
      const CustomComponent = response.component;
      return <CustomComponent {...(input as object)} />;
    }
    // fallback if there is a UI component message but we don't have
    // a React component that matches
    if (FallbackComponent) {
      return <FallbackComponent {...(input as object)} />;
    }
  }
};

export const MessageControl: MessageControl = ({ message }) => {
  const messageRenderer = React.useContext(MessageRendererContext);

  return (
    <>
      {message.content.map((content, index) => {
        if (content.text) {
          return messageRenderer?.text ? (
            <React.Fragment key={index}>
              {messageRenderer.text({ text: content.text })}
            </React.Fragment>
          ) : (
            <TextContent data-testid={'text-content'} key={index}>
              {content.text}
            </TextContent>
          );
        } else if (content.image) {
          return messageRenderer?.image ? (
            <React.Fragment key={index}>
              {messageRenderer?.image({ image: content.image })}
            </React.Fragment>
          ) : (
            <MediaContent
              data-testid={'image-content'}
              key={index}
              alt=""
              src={convertBufferToBase64(
                content.image?.source.bytes,
                content.image?.format
              )}
            />
          );
        } else if (content.toolUse) {
          return <ToolContent toolUse={content.toolUse} key={index} />;
        }
      })}
    </>
  );
};
interface MessageControl {
  (props: { message: ConversationMessage }): JSX.Element;
}

const Timestamp = withBaseElementProps(Text, {
  className: `${MESSAGE_BLOCK}__timestamp`,
});

const HeaderContainer: typeof View = React.forwardRef(
  function HeaderContainer(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    return (
      <View
        ref={ref}
        className={`${MESSAGE_BLOCK}__header__container ${MESSAGE_BLOCK}__header__container--${variant}`}
        {...props}
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
        ref={ref}
        className={`${MESSAGE_BLOCK} ${MESSAGE_BLOCK}--${variant} ${MESSAGE_BLOCK}--${role}`}
        {...props}
      />
    );
  }
);

const Layout: typeof View = React.forwardRef(function Layout(props, ref) {
  const variant = React.useContext(MessageVariantContext);
  return (
    <View
      ref={ref}
      className={`${MESSAGES_BLOCK}__container ${MESSAGES_BLOCK}__container--${variant}`}
      aria-live={'assertive'}
      {...props}
    />
  );
});

export const MessagesControl: MessagesControl = () => {
  const messages = React.useContext(MessagesContext);
  const controls = React.useContext(ControlsContext);
  const { getMessageTimestampText } = useConversationDisplayText();
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

  if (controls?.MessageList) {
    return <controls.MessageList messages={messages!} />;
  }

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
    <Layout>
      {messagesWithRenderableContent?.map((message, index) => {
        return (
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
                <Timestamp>
                  {getMessageTimestampText(new Date(message.createdAt))}
                </Timestamp>
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

export interface MessagesControl {
  (): JSX.Element;
  ActionsBar: ActionsBarControl;
  Avatar: AvatarControl;
  Container: AIConversationElements['View'];
  HeaderContainer: AIConversationElements['View'];
  Layout: AIConversationElements['View'];
  Message: MessageControl;
}
