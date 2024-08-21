import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import '../../context/ActionsContext.mjs';
import '../../context/AvatarsContext.mjs';
import '../../context/InputContext.mjs';
import { RoleContext, MessagesContext } from '../../context/MessagesContext.mjs';
import '../../context/SuggestedPromptsContext.mjs';
import { MessageVariantContext } from '../../context/MessageVariantContext.mjs';
import { AIConversationElements } from '../../context/elements/definitions.mjs';
import { convertBufferToBase64, formatDate } from '../../utils.mjs';
import { ActionsBarControl } from './ActionsBarControl.mjs';
import { AvatarControl } from './AvatarControl.mjs';

const { Image, Span, Text, View } = AIConversationElements;
const MESSAGES_BLOCK = 'ai-messages';
const MESSAGE_BLOCK = 'ai-message';
const MediaContentBase = withBaseElementProps(Image, {
    alt: 'Image attachment',
});
const MediaContent = React.forwardRef(function MediaContent(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    const role = React.useContext(RoleContext);
    return (React.createElement(MediaContentBase, { ...props, ref: ref, className: `${MESSAGE_BLOCK}__image ${MESSAGE_BLOCK}__image--${variant} ${MESSAGE_BLOCK}__image--${role}` }));
});
const TextContent = React.forwardRef(function TextContent(props, ref) {
    return React.createElement(Text, { ...props, ref: ref, className: `${MESSAGE_BLOCK}__text` });
});
const ContentContainer = React.forwardRef(function ContentContainer(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    return (React.createElement(View, { "data-testid": 'content', ...props, ref: ref, className: `${MESSAGE_BLOCK}__content ${MESSAGE_BLOCK}__content--${variant}` }));
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
const MessageControl = ({ message }) => {
    return (React.createElement(ContentContainer, null, message.content.map((content, index) => {
        if (content.text) {
            return (React.createElement(TextContent, { "data-testid": 'text-content', key: index }, content.text));
        }
        else if (content.image) {
            return (React.createElement(MediaContent, { "data-testid": 'image-content', key: index, src: convertBufferToBase64(content.image?.source.bytes, content.image?.format) }));
        }
    })));
};
MessageControl.Container = ContentContainer;
MessageControl.MediaContent = MediaContent;
MessageControl.TextContent = TextContent;
const Separator = withBaseElementProps(Span, {
    'aria-hidden': true,
    children: '|',
    className: `${MESSAGE_BLOCK}__separator`,
});
const Timestamp = withBaseElementProps(Text, {
    className: `${MESSAGE_BLOCK}__timestamp`,
});
const HeaderContainer = React.forwardRef(function HeaderContainer(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    return (React.createElement(View, { ...props, ref: ref, className: `${MESSAGE_BLOCK}__header__container ${MESSAGE_BLOCK}__header__container--${variant}` }));
});
const MessageContainer = React.forwardRef(function MessageContainer(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    const role = React.useContext(RoleContext);
    return (React.createElement(View, { ...props, ref: ref, className: `${MESSAGE_BLOCK} ${MESSAGE_BLOCK}--${variant} ${MESSAGE_BLOCK}--${role}` }));
});
const Layout = React.forwardRef(function Layout(props, ref) {
    const variant = React.useContext(MessageVariantContext);
    return (React.createElement(View, { ...props, ref: ref, className: `${MESSAGES_BLOCK}__container ${MESSAGES_BLOCK}__container--${variant}` }));
});
const MessagesControl = ({ renderMessage }) => {
    const messages = React.useContext(MessagesContext);
    const messagesRef = React.useRef([]);
    const [focusedItemIndex, setFocusedItemIndex] = React.useState(messages ? messages.length - 1 : 0);
    const handleFocus = (index) => setFocusedItemIndex(index);
    const onKeyDown = React.useCallback((index, { key }) => {
        let newIndex;
        switch (key) {
            case 'ArrowUp':
                newIndex = Math.max(0, index - 1);
                setFocusedItemIndex(newIndex);
                messagesRef.current[newIndex]?.focus();
                break;
            case 'ArrowDown':
                newIndex = Math.min(index + 1, messages.length - 1);
                setFocusedItemIndex(newIndex);
                messagesRef.current[newIndex]?.focus();
                break;
            case 'Home':
                newIndex = 0;
                setFocusedItemIndex(newIndex);
                messagesRef.current[newIndex]?.focus();
                break;
            case 'End':
                newIndex = messages.length - 1;
                setFocusedItemIndex(newIndex);
                messagesRef.current[newIndex]?.focus();
                break;
        }
        return;
    }, [messages]);
    return (React.createElement(Layout, null, messages?.map((message, index) => {
        return renderMessage ? (renderMessage(message)) : (React.createElement(RoleContext.Provider, { value: message.role, key: `message-${index}` },
            React.createElement(MessageContainer, { "data-testid": `message`, key: `message-${index}`, tabIndex: focusedItemIndex === index ? 0 : -1, onFocus: () => handleFocus(index), onKeyDown: (event) => onKeyDown(index, event), ref: (el) => (messagesRef.current[index] = el) },
                React.createElement(HeaderContainer, null,
                    React.createElement(AvatarControl, null),
                    React.createElement(Separator, null),
                    React.createElement(Timestamp, null, formatDate(new Date(message.createdAt)))),
                React.createElement(MessageControl, { message: message }),
                message.role === 'assistant' ? (React.createElement(ActionsBarControl, { message: message, focusable: focusedItemIndex === index })) : null)));
    })));
};
MessagesControl.ActionsBar = ActionsBarControl;
MessagesControl.Avatar = AvatarControl;
MessagesControl.Container = MessageContainer;
MessagesControl.HeaderContainer = HeaderContainer;
MessagesControl.Layout = Layout;
MessagesControl.Message = MessageControl;
MessagesControl.Separator = Separator;

export { MessageControl, MessagesControl };
