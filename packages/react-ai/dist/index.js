'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var elements = require('@aws-amplify/ui-react-core/elements');
var ui = require('@aws-amplify/ui');
var uiReactCore = require('@aws-amplify/ui-react-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEFAULT_ICON_PATHS = {
    attach: 'M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z',
    close: 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z',
    image: 'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z',
    'send-message': 'M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z',
    'user-avatar': 'M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z',
};
const DEFAULT_ICON_ATTRIBUTES = {
    'aria-hidden': true,
    width: '24',
    height: '24',
    // `viewBox` coordinates map to `path` data in DEFAULT_ICON_PATHS
    viewBox: '0 -960 960 960',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
};
const BaseIconElement = elements.defineBaseElement({
    type: 'svg',
    displayName: 'Icon',
});
const getIconProps = ({ variant, ...props }) => {
    const pathData = variant ? DEFAULT_ICON_PATHS[variant] : undefined;
    const children = pathData ? (React__default["default"].createElement("path", { d: pathData, fill: "currentColor" })) : undefined;
    return {
        ...DEFAULT_ICON_ATTRIBUTES,
        ...props,
        children: props.children ?? children,
        variant,
    };
};
const IconElement = elements.withBaseElementProps(BaseIconElement, getIconProps);

const LabelElement$1 = elements.defineBaseElement({
    type: 'label',
    displayName: 'Label',
});
const TextElement = elements.defineBaseElement({
    type: 'p',
    displayName: 'Text',
});
const UnorderedListElement = elements.defineBaseElement({
    type: 'ul',
    displayName: 'UnorderedList',
});
const ListItemElement = elements.defineBaseElement({
    type: 'li',
    displayName: 'ListItem',
});
const HeadingElement = elements.defineBaseElement({
    type: 'h2',
    displayName: 'Title',
});
const ImageElement = elements.defineBaseElement({
    type: 'img',
    displayName: 'Image',
});
const InputElement = elements.defineBaseElement({
    type: 'input',
    displayName: 'Input',
});
const ButtonElement = elements.defineBaseElement({ type: 'button', displayName: 'Button' });
const ViewElement = elements.defineBaseElement({
    type: 'div',
    displayName: 'View',
});
const SpanElement = elements.defineBaseElement({
    type: 'span',
    displayName: 'Span',
});
const TextAreaElement = elements.defineBaseElement({
    type: 'textarea',
    displayName: 'TextArea',
});
const AIConversationElements = {
    Button: ButtonElement,
    Heading: HeadingElement,
    Icon: IconElement,
    Input: InputElement,
    Image: ImageElement,
    Label: LabelElement$1,
    ListItem: ListItemElement,
    Span: SpanElement,
    Text: TextElement,
    TextArea: TextAreaElement,
    UnorderedList: UnorderedListElement,
    View: ViewElement,
};

const ActionsContext = React__default["default"].createContext(undefined);
const ActionsProvider = ({ children, actions, }) => {
    return (React__default["default"].createElement(ActionsContext.Provider, { value: actions }, children));
};

const AvatarsContext = React__default["default"].createContext(undefined);
const AvatarsProvider = ({ children, avatars, }) => {
    return (React__default["default"].createElement(AvatarsContext.Provider, { value: avatars }, children));
};

const InputContext = React__default["default"].createContext({});
const InputContextProvider = ({ children, }) => {
    const [input, setInput] = React__default["default"].useState();
    const providerValue = React__default["default"].useMemo(() => ({ input, setInput }), [input, setInput]);
    return (React__default["default"].createElement(InputContext.Provider, { value: providerValue }, children));
};

const MessagesContext = React__default["default"].createContext(undefined);
// role of the user sending the message, assistant or user
const RoleContext = React__default["default"].createContext(undefined);
const MessagesProvider = ({ children, messages, }) => {
    return (React__default["default"].createElement(MessagesContext.Provider, { value: messages }, children));
};

const SuggestedPromptsContext = React__default["default"].createContext(undefined);
const SuggestedPromptProvider = ({ children, suggestedPrompts, }) => {
    return (React__default["default"].createElement(SuggestedPromptsContext.Provider, { value: suggestedPrompts }, children));
};

const MessageVariantContext = React__default["default"].createContext('borderless');
const MessageVariantProvider = ({ children, variant, }) => {
    return (React__default["default"].createElement(MessageVariantContext.Provider, { value: variant }, children));
};

const { Button: Button$5, Span: Span$3, View: View$7 } = AIConversationElements;
const ACTIONS_BAR_BLOCK = 'ai-actions-bar';
const ActionIcon = elements.withBaseElementProps(Span$3, {
    'aria-hidden': 'true',
    className: `${ACTIONS_BAR_BLOCK}__icon`,
});
const ActionButtonBase = elements.withBaseElementProps(Button$5, {
    className: `${ACTIONS_BAR_BLOCK}__button`,
});
const ActionButton = React__default["default"].forwardRef(function ActionButton(props, ref) {
    return React__default["default"].createElement(ActionButtonBase, { ...props, ref: ref });
});
const Container$4 = elements.withBaseElementProps(View$7, {
    className: `${ACTIONS_BAR_BLOCK}__container`,
});
const ActionsBarControl = ({ message, focusable, }) => {
    const actions = React__default["default"].useContext(ActionsContext);
    return (React__default["default"].createElement(Container$4, null, actions?.map((action, index) => (React__default["default"].createElement(ActionButton, { "aria-label": action.displayName, key: index, onClick: () => action.handler(message), tabIndex: focusable ? 0 : -1 },
        React__default["default"].createElement(ActionIcon, { "data-testid": `action-icon-${action.displayName}` }, action.icon))))));
};
ActionsBarControl.Button = ActionButton;
ActionsBarControl.Container = Container$4;
ActionsBarControl.Icon = ActionIcon;

const { Icon: Icon$5, Span: Span$2, Text: Text$4, View: View$6 } = AIConversationElements;
const AVATAR_BLOCK = 'ai-avatar';
const DEFAULT_USER_ICON = elements.withBaseElementProps(Icon$5, {
    variant: 'user-avatar',
});
const DEFAULT_AI_ICON = () => (React__default["default"].createElement("svg", { width: "28", height: "28", viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React__default["default"].createElement("g", { id: "raven-logo" },
        React__default["default"].createElement("path", { id: "Subtract", fillRule: "evenodd", clipRule: "evenodd", d: "M16 1.29833C14.7624 0.583803 13.2376 0.583804 12 1.29833L4.00006 5.91711C2.76246 6.63165 2.00006 7.95216 2.00006 9.38122V18.6188C2.00006 20.0478 2.76246 21.3684 4.00006 22.0829L12 26.7017C13.2376 27.4162 14.7624 27.4162 16 26.7017L24 22.0829C25.2376 21.3684 26 20.0478 26 18.6188V9.38122C26 7.95215 25.2376 6.63164 24 5.91711L16 1.29833ZM14.9379 6.37317C14.6157 5.50255 13.3843 5.50255 13.0622 6.37317L11.4151 10.8243C11.3138 11.098 11.098 11.3138 10.8243 11.4151L6.37317 13.0621C5.50256 13.3843 5.50256 14.6157 6.37317 14.9378L10.8243 16.5849C11.098 16.6862 11.3138 16.902 11.4151 17.1757L13.0622 21.6268C13.3843 22.4974 14.6157 22.4974 14.9379 21.6268L16.5849 17.1757C16.6862 16.902 16.902 16.6862 17.1757 16.5849L21.6268 14.9378C22.4974 14.6157 22.4974 13.3843 21.6268 13.0621L17.1757 11.4151C16.902 11.3138 16.6862 11.098 16.5849 10.8243L14.9379 6.37317Z", fill: "#0D1A26" }))));
const AvatarDisplayName = elements.withBaseElementProps(Text$4, {
    className: `${AVATAR_BLOCK}__display-name`,
});
const AvatarIcon = elements.withBaseElementProps(Span$2, {
    'aria-hidden': true,
    className: `${AVATAR_BLOCK}__icon`,
});
const Container$3 = elements.withBaseElementProps(View$6, {
    className: `${AVATAR_BLOCK}__container`,
});
const AvatarControl = () => {
    const avatars = React__default["default"].useContext(AvatarsContext);
    const role = React__default["default"].useContext(RoleContext);
    const avatar = role === 'assistant' ? avatars?.ai : avatars?.user;
    const defaultIcon = role === 'assistant' ? React__default["default"].createElement(DEFAULT_AI_ICON, null) : React__default["default"].createElement(DEFAULT_USER_ICON, null);
    const defaultDisplayName = role === 'user' ? 'User' : 'Assistant';
    return (React__default["default"].createElement(Container$3, { "data-testid": 'avatar' },
        React__default["default"].createElement(AvatarIcon, { "data-testid": `avatar-icon-${role}` }, avatar?.avatar ?? defaultIcon),
        React__default["default"].createElement(AvatarDisplayName, null, avatar?.username ?? defaultDisplayName)));
};
AvatarControl.Container = Container$3;
AvatarControl.DisplayName = AvatarDisplayName;
AvatarControl.Icon = AvatarIcon;

const { View: View$5, Button: Button$4, Icon: Icon$4, Text: Text$3 } = AIConversationElements;
const HEADER_BLOCK = 'ai-header';
const HeaderTextBase = elements.withBaseElementProps(Text$3, {
    className: `${HEADER_BLOCK}__text`,
});
const HeaderText$1 = React__default["default"].forwardRef(function HeaderText(props, ref) {
    return React__default["default"].createElement(HeaderTextBase, { ...props, ref: ref });
});
const CloseIcon = elements.withBaseElementProps(Icon$4, {
    className: `${HEADER_BLOCK}__icon`,
    variant: 'close',
});
const CloseButtonBase = elements.withBaseElementProps(Button$4, {
    className: `${HEADER_BLOCK}__button`,
});
const CloseButton = React__default["default"].forwardRef(function CloseButton(props, ref) {
    return React__default["default"].createElement(CloseButtonBase, { ...props, ref: ref });
});
const Container$2 = elements.withBaseElementProps(View$5, {
    className: `${HEADER_BLOCK}__container`,
});
const HeaderControl = () => (React__default["default"].createElement(Container$2, null,
    React__default["default"].createElement(HeaderText$1, null, "Raven Chat"),
    React__default["default"].createElement(CloseButton, null,
        React__default["default"].createElement(CloseIcon, null))));
HeaderControl.Container = Container$2;
HeaderControl.Text = HeaderText$1;
HeaderControl.Button = CloseButton;

const { Button: Button$3, Icon: Icon$3, View: View$4 } = AIConversationElements;
const ATTACH_FILE_BLOCK = 'ai-attach-file';
const FIELD_BLOCK$1 = 'ai-field';
const AttachFileIcon = elements.withBaseElementProps(Icon$3, {
    className: `${ATTACH_FILE_BLOCK}__icon`,
    variant: 'attach',
});
const AttachFileContainer = elements.withBaseElementProps(View$4, {
    className: `${ATTACH_FILE_BLOCK}__container`,
});
const VisuallyHidden$1 = elements.withBaseElementProps(View$4, {
    className: `${FIELD_BLOCK$1}__visually-hidden`,
});
const AttachFileButton = elements.withBaseElementProps(Button$3, {
    'aria-label': 'Attach file',
    className: `${FIELD_BLOCK$1}__button`,
    type: 'button',
    variant: 'attach',
});
const AttachFileControl = () => {
    const hiddenInput = React__default["default"].useRef(null);
    const { setInput } = React__default["default"].useContext(InputContext);
    function handleButtonClick() {
        if (hiddenInput.current) {
            hiddenInput.current.click();
            hiddenInput.current.value = '';
        }
    }
    function handleFileChange(e) {
        const { files } = e.target;
        if (files && files?.length > 0 && setInput) {
            Array.from(files).forEach((file) => {
                setInput((prevInput) => ({
                    ...prevInput,
                    files: [...(prevInput?.files ?? []), file],
                }));
            });
        }
    }
    return (React__default["default"].createElement(AttachFileContainer, null,
        React__default["default"].createElement(AttachFileButton, { onClick: handleButtonClick },
            React__default["default"].createElement(AttachFileIcon, null)),
        React__default["default"].createElement(VisuallyHidden$1, null,
            React__default["default"].createElement("input", { 
                // TODO follow up about what file types are accepted
                accept: ".jpeg,.png,.webp,.gif", "data-testid": "hidden-file-input", onChange: handleFileChange, ref: hiddenInput, type: "file", multiple: true }))));
};
AttachFileControl.Icon = AttachFileIcon;
AttachFileControl.Button = AttachFileButton;
AttachFileControl.Container = AttachFileContainer;

const { Button: Button$2, Icon: Icon$2, ListItem, UnorderedList: ListElement, Span: Span$1, Text: Text$2, View: View$3, } = AIConversationElements;
const IMAGE_LIST_BLOCK = 'ai-attachment-list';
const IMAGE_ITEM_BLOCK = 'ai-attachment';
const REMOVE_IMAGE_BLOCK = 'ai-remove-attachment';
const IMAGE_TEXT_BLOCK = 'ai-attachment-text';
const RemoveIcon = elements.withBaseElementProps(Icon$2, {
    className: `${REMOVE_IMAGE_BLOCK}__icon`,
    variant: 'close',
});
const RemoveButton = elements.withBaseElementProps(Button$2, {
    'aria-label': 'Remove file',
    className: `${REMOVE_IMAGE_BLOCK}__button`,
    variant: 'remove',
    type: 'button',
});
const RemoveButtonControl = ({ onRemove }) => {
    return (React__default["default"].createElement(RemoveButton, { onClick: onRemove },
        React__default["default"].createElement(RemoveIcon, null)));
};
RemoveButtonControl.Icon = RemoveIcon;
RemoveButtonControl.Button = RemoveButton;
const ImageIcon = elements.withBaseElementProps(Icon$2, {
    className: `${IMAGE_ITEM_BLOCK}__icon`,
    variant: 'image',
});
const FileNameText = elements.withBaseElementProps(Text$2, {
    className: `${IMAGE_TEXT_BLOCK}__file-name`,
});
const FileSizeText = elements.withBaseElementProps(Text$2, {
    className: `${IMAGE_TEXT_BLOCK}__file-size`,
});
const Separator$1 = elements.withBaseElementProps(Span$1, {
    'aria-hidden': true,
    className: `${IMAGE_TEXT_BLOCK}__separator`,
    children: '|',
});
const TextContainer = elements.withBaseElementProps(View$3, {
    className: `${IMAGE_TEXT_BLOCK}__container`,
});
const TextControl = ({ fileName, fileSize }) => {
    return (React__default["default"].createElement(TextContainer, null,
        React__default["default"].createElement(FileNameText, null, fileName),
        React__default["default"].createElement(Separator$1, null),
        React__default["default"].createElement(FileSizeText, null, fileSize)));
};
TextControl.Container = TextContainer;
TextControl.FileName = FileNameText;
TextControl.FileSize = FileSizeText;
TextControl.Separator = Separator$1;
const Container$1 = elements.withBaseElementProps(ListItem, {
    className: `${IMAGE_ITEM_BLOCK}__list-item`,
});
const AttachmentControl = ({ image, onRemove }) => {
    return (React__default["default"].createElement(Container$1, null,
        React__default["default"].createElement(ImageIcon, null),
        React__default["default"].createElement(TextControl, { fileName: image.name, fileSize: image.size }),
        React__default["default"].createElement(RemoveButtonControl, { onRemove: onRemove })));
};
AttachmentControl.Container = Container$1;
AttachmentControl.ImageIcon = ImageIcon;
AttachmentControl.RemoveButton = RemoveButtonControl;
AttachmentControl.Text = TextControl;
const UnorderedList = elements.withBaseElementProps(ListElement, {
    className: `${IMAGE_LIST_BLOCK}__unordered-list`,
});
const AttachmentListControl = () => {
    const { input, setInput } = React__default["default"].useContext(InputContext);
    return (React__default["default"].createElement(UnorderedList, null, input?.files?.map((file, index) => {
        const onRemove = () => {
            if (setInput) {
                setInput((prevInput) => ({
                    ...prevInput,
                    files: prevInput?.files?.filter((_file) => _file !== file),
                }));
            }
        };
        return (React__default["default"].createElement(AttachmentControl, { key: index, image: file, onRemove: onRemove }));
    })));
};
AttachmentListControl.List = UnorderedList;
AttachmentListControl.Item = AttachmentControl;

const SendMessageContext = React__default["default"].createContext(undefined);
const SendMessageContextProvider = ({ children, handleSendMessage, }) => {
    return (React__default["default"].createElement(SendMessageContext.Provider, { value: handleSendMessage }, children));
};

const { Button: Button$1, Icon: Icon$1, Label: LabelElement, TextArea, View: View$2, } = AIConversationElements;
const FIELD_BLOCK = 'ai-field';
const SendIcon = elements.withBaseElementProps(Icon$1, {
    className: `${FIELD_BLOCK}__icon`,
    variant: 'send-message',
});
const SendButtonBase = elements.withBaseElementProps(Button$1, {
    'aria-label': 'Send message',
    className: `${FIELD_BLOCK}__button ${FIELD_BLOCK}__button--send`,
});
const SendButton = React__default["default"].forwardRef(function SendButton(props, ref) {
    const { input } = React__default["default"].useContext(InputContext);
    const hasInput = !!input?.text || !!input?.files?.length;
    return (React__default["default"].createElement(SendButtonBase, { ...props, disabled: !hasInput, type: "submit", ref: ref }));
});
const TextAreaBase = elements.withBaseElementProps(TextArea, {
    className: `${FIELD_BLOCK}__input`,
    id: `${FIELD_BLOCK}-text-input`,
    name: 'text-input',
});
const VisuallyHidden = elements.withBaseElementProps(View$2, {
    className: `${FIELD_BLOCK}__visually-hidden`,
});
const Label = elements.withBaseElementProps(LabelElement, {
    children: 'Type your message here',
    className: `${FIELD_BLOCK}__label`,
    htmlFor: 'text-input',
});
const TextInput = React__default["default"].forwardRef(function TextInput(props, ref) {
    const { setInput } = React__default["default"].useContext(InputContext);
    const messages = React__default["default"].useContext(MessagesContext);
    const textAreaRef = React__default["default"].useRef(null);
    const isFirstMessage = !messages || messages.length === 0;
    React__default["default"].useEffect(() => {
        const textarea = document.getElementById(`${FIELD_BLOCK}-text-input`);
        const handleResize = () => {
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };
        if (textarea && textarea instanceof HTMLTextAreaElement) {
            textarea.addEventListener('input', handleResize);
            handleResize();
        }
        return () => {
            if (textarea) {
                textarea.removeEventListener('input', handleResize);
            }
        };
    });
    React__default["default"].useEffect(() => {
        if (textAreaRef && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [textAreaRef]);
    return (React__default["default"].createElement(TextAreaBase, { ...props, "data-testid": "text-input", id: "text-input", onChange: (e) => props.onChange ??
            (setInput &&
                setInput((prevInput) => ({ ...prevInput, text: e.target.value }))), placeholder: props.placeholder ?? isFirstMessage
            ? 'Ask anything...'
            : 'Message Raven', ref: (node) => {
            textAreaRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            }
            else if (ref) {
                ref.current = node;
            }
        }, autoFocus: true }));
});
const InputContainer = elements.withBaseElementProps(View$2, {
    className: `${FIELD_BLOCK}__input-container`,
});
const FieldControl = () => {
    const { input, setInput } = React__default["default"].useContext(InputContext);
    const handleSendMessage = React__default["default"].useContext(SendMessageContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        const submittedContent = [];
        if (input?.text) {
            const textContent = {
                text: input.text,
            };
            submittedContent.push(textContent);
        }
        if (input?.files) {
            input.files.forEach((file) => {
                file.arrayBuffer().then((buffer) => {
                    const fileContent = {
                        image: {
                            format: file.type,
                            source: { bytes: new Uint8Array(buffer) },
                        },
                    };
                    submittedContent.push(fileContent);
                });
            });
        }
        if (handleSendMessage)
            handleSendMessage({ content: submittedContent });
        if (setInput)
            setInput({ text: '', files: [] });
    };
    return (React__default["default"].createElement("form", { className: `${FIELD_BLOCK}__form`, onSubmit: handleSubmit },
        React__default["default"].createElement(AttachFileControl, null),
        React__default["default"].createElement(InputContainer, null,
            React__default["default"].createElement(VisuallyHidden, null,
                React__default["default"].createElement(Label, null)),
            React__default["default"].createElement(TextInput, null),
            React__default["default"].createElement(AttachmentListControl, null)),
        React__default["default"].createElement(SendButton, null,
            React__default["default"].createElement(SendIcon, null))));
};
FieldControl.AttachFile = AttachFileControl;
FieldControl.InputContainer = InputContainer;
FieldControl.Label = Label;
FieldControl.TextInput = TextInput;
FieldControl.SendButton = SendButton;
FieldControl.SendIcon = SendIcon;

function formatDate(date) {
    const dateString = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    return `${dateString} at ${timeString}`;
}
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
function convertBufferToBase64(buffer, format) {
    let base64string = '';
    // Use node-based buffer if available
    // fall back on browser if not
    if (typeof Buffer !== 'undefined') {
        base64string = Buffer.from(new Uint8Array(buffer)).toString('base64');
    }
    else {
        base64string = arrayBufferToBase64(buffer);
    }
    return `data:image/${format};base64,${base64string}`;
}

const { Image, Span, Text: Text$1, View: View$1 } = AIConversationElements;
const MESSAGES_BLOCK = 'ai-messages';
const MESSAGE_BLOCK = 'ai-message';
const MediaContentBase = elements.withBaseElementProps(Image, {
    alt: 'Image attachment',
});
const MediaContent = React__default["default"].forwardRef(function MediaContent(props, ref) {
    const variant = React__default["default"].useContext(MessageVariantContext);
    const role = React__default["default"].useContext(RoleContext);
    return (React__default["default"].createElement(MediaContentBase, { ...props, ref: ref, className: `${MESSAGE_BLOCK}__image ${MESSAGE_BLOCK}__image--${variant} ${MESSAGE_BLOCK}__image--${role}` }));
});
const TextContent = React__default["default"].forwardRef(function TextContent(props, ref) {
    return React__default["default"].createElement(Text$1, { ...props, ref: ref, className: `${MESSAGE_BLOCK}__text` });
});
const ContentContainer = React__default["default"].forwardRef(function ContentContainer(props, ref) {
    const variant = React__default["default"].useContext(MessageVariantContext);
    return (React__default["default"].createElement(View$1, { "data-testid": 'content', ...props, ref: ref, className: `${MESSAGE_BLOCK}__content ${MESSAGE_BLOCK}__content--${variant}` }));
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
    return (React__default["default"].createElement(ContentContainer, null, message.content.map((content, index) => {
        if (content.text) {
            return (React__default["default"].createElement(TextContent, { "data-testid": 'text-content', key: index }, content.text));
        }
        else if (content.image) {
            return (React__default["default"].createElement(MediaContent, { "data-testid": 'image-content', key: index, src: convertBufferToBase64(content.image?.source.bytes, content.image?.format) }));
        }
    })));
};
MessageControl.Container = ContentContainer;
MessageControl.MediaContent = MediaContent;
MessageControl.TextContent = TextContent;
const Separator = elements.withBaseElementProps(Span, {
    'aria-hidden': true,
    children: '|',
    className: `${MESSAGE_BLOCK}__separator`,
});
const Timestamp = elements.withBaseElementProps(Text$1, {
    className: `${MESSAGE_BLOCK}__timestamp`,
});
const HeaderContainer = React__default["default"].forwardRef(function HeaderContainer(props, ref) {
    const variant = React__default["default"].useContext(MessageVariantContext);
    return (React__default["default"].createElement(View$1, { ...props, ref: ref, className: `${MESSAGE_BLOCK}__header__container ${MESSAGE_BLOCK}__header__container--${variant}` }));
});
const MessageContainer = React__default["default"].forwardRef(function MessageContainer(props, ref) {
    const variant = React__default["default"].useContext(MessageVariantContext);
    const role = React__default["default"].useContext(RoleContext);
    return (React__default["default"].createElement(View$1, { ...props, ref: ref, className: `${MESSAGE_BLOCK} ${MESSAGE_BLOCK}--${variant} ${MESSAGE_BLOCK}--${role}` }));
});
const Layout = React__default["default"].forwardRef(function Layout(props, ref) {
    const variant = React__default["default"].useContext(MessageVariantContext);
    return (React__default["default"].createElement(View$1, { ...props, ref: ref, className: `${MESSAGES_BLOCK}__container ${MESSAGES_BLOCK}__container--${variant}` }));
});
const MessagesControl = ({ renderMessage }) => {
    const messages = React__default["default"].useContext(MessagesContext);
    const messagesRef = React__default["default"].useRef([]);
    const [focusedItemIndex, setFocusedItemIndex] = React__default["default"].useState(messages ? messages.length - 1 : 0);
    const handleFocus = (index) => setFocusedItemIndex(index);
    const onKeyDown = React__default["default"].useCallback((index, { key }) => {
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
    return (React__default["default"].createElement(Layout, null, messages?.map((message, index) => {
        return renderMessage ? (renderMessage(message)) : (React__default["default"].createElement(RoleContext.Provider, { value: message.role, key: `message-${index}` },
            React__default["default"].createElement(MessageContainer, { "data-testid": `message`, key: `message-${index}`, tabIndex: focusedItemIndex === index ? 0 : -1, onFocus: () => handleFocus(index), onKeyDown: (event) => onKeyDown(index, event), ref: (el) => (messagesRef.current[index] = el) },
                React__default["default"].createElement(HeaderContainer, null,
                    React__default["default"].createElement(AvatarControl, null),
                    React__default["default"].createElement(Separator, null),
                    React__default["default"].createElement(Timestamp, null, formatDate(new Date(message.createdAt)))),
                React__default["default"].createElement(MessageControl, { message: message }),
                message.role === 'assistant' ? (React__default["default"].createElement(ActionsBarControl, { message: message, focusable: focusedItemIndex === index })) : null)));
    })));
};
MessagesControl.ActionsBar = ActionsBarControl;
MessagesControl.Avatar = AvatarControl;
MessagesControl.Container = MessageContainer;
MessagesControl.HeaderContainer = HeaderContainer;
MessagesControl.Layout = Layout;
MessagesControl.Message = MessageControl;
MessagesControl.Separator = Separator;

const { View, Button, Text, Heading, Icon } = AIConversationElements;
const PROMPT_BLOCK = 'ai-prompts';
const PROMPT_CONTROL = `${PROMPT_BLOCK}__prompt`;
const PROMPT_CARD = `${PROMPT_CONTROL}__card`;
const PromptCard = elements.withBaseElementProps(Button, {
    className: PROMPT_CARD,
    type: 'button',
});
const AIIconProps = () => ({
    children: (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement("path", { d: "M17.5 1.64858C19.047 0.755412 20.953 0.755412 22.5 1.64858L34.6428 8.65923C36.1898 9.55239 37.1428 11.203 37.1428 12.9894V27.0107C37.1428 28.797 36.1898 30.4476 34.6428 31.3408L22.5 38.3514C20.953 39.2446 19.047 39.2446 17.5 38.3514L5.35718 31.3408C3.81017 30.4476 2.85718 28.797 2.85718 27.0107V12.9894C2.85718 11.203 3.81017 9.55239 5.35718 8.65923L17.5 1.64858Z", fill: "white" }),
        React__default["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M22.5 1.64851C20.953 0.755347 19.047 0.755347 17.5 1.64851L5.35718 8.65916C3.81017 9.55233 2.85718 11.203 2.85718 12.9893V27.0106C2.85718 28.7969 3.81017 30.4476 5.35718 31.3407L17.5 38.3514C19.047 39.2445 20.953 39.2445 22.5 38.3514L34.6428 31.3407C36.1898 30.4476 37.1428 28.7969 37.1428 27.0106V12.9893C37.1428 11.203 36.1898 9.55233 34.6428 8.65916L22.5 1.64851ZM20.9378 8.01826C20.6156 7.14764 19.3843 7.14764 19.0621 8.01825L16.2388 15.648C16.1375 15.9217 15.9217 16.1375 15.648 16.2388L8.01826 19.0621C7.14765 19.3842 7.14765 20.6156 8.01826 20.9378L15.648 23.7611C15.9217 23.8623 16.1375 24.0782 16.2388 24.3519L19.0621 31.9816C19.3843 32.8522 20.6156 32.8522 20.9378 31.9816L23.7611 24.3519C23.8624 24.0782 24.0782 23.8623 24.3519 23.7611L31.9816 20.9378C32.8523 20.6156 32.8523 19.3842 31.9816 19.0621L24.3519 16.2388C24.0782 16.1375 23.8624 15.9217 23.7611 15.648L20.9378 8.01826Z", fill: "url(#paint0_linear_395_1815)" }),
        React__default["default"].createElement("defs", null,
            React__default["default"].createElement("linearGradient", { id: "paint0_linear_395_1815", x1: "20", y1: "0.978638", x2: "20", y2: "39.0213", gradientUnits: "userSpaceOnUse" },
                React__default["default"].createElement("stop", { stopColor: "#7DD6E8" }),
                React__default["default"].createElement("stop", { offset: "1", stopColor: "#BF40BF" }))))),
    className: `${PROMPT_CONTROL}__icon`,
    width: '40',
    height: '40',
    viewBox: '0 0 40 40',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
});
const AIIcon = elements.withBaseElementProps(Icon, AIIconProps);
const HeaderText = elements.withBaseElementProps(Heading, {
    className: `${PROMPT_CONTROL}__header`,
});
const PromptGroupBase = elements.withBaseElementProps(View, {
    className: `${PROMPT_CONTROL}__buttongroup`,
});
const PromptGroup = React__default["default"].forwardRef(function ButtonGroup(props, ref) {
    const suggestedPromptsArray = React__default["default"].useContext(SuggestedPromptsContext);
    const { setInput } = React__default["default"].useContext(InputContext);
    if (!suggestedPromptsArray) {
        return;
    }
    return (React__default["default"].createElement(PromptGroupBase, { ...props, ref: ref }, suggestedPromptsArray.map((prompt, index) => {
        return (React__default["default"].createElement(PromptCard, { key: index, "aria-label": prompt.inputText, onClick: () => setInput &&
                setInput((prevInput) => ({
                    ...prevInput,
                    text: prompt.inputText,
                })) },
            React__default["default"].createElement(Text, { className: ui.classNames(`${PROMPT_CARD}__header`, `${PROMPT_CARD}__text`) }, prompt.header),
            React__default["default"].createElement(Text, { className: `${PROMPT_CARD}__text` }, prompt.inputText)));
    })));
});
const Container = elements.withBaseElementProps(View, {
    className: `${PROMPT_BLOCK}__container`,
});
const PromptControl = () => (React__default["default"].createElement(Container, null,
    React__default["default"].createElement(AIIcon, null),
    React__default["default"].createElement(HeaderText, null, "How can I help you today?"),
    React__default["default"].createElement(PromptGroup, null)));
const AutoHidablePromptControl = () => {
    const messages = React__default["default"].useContext(MessagesContext);
    if (!messages || messages.length === 0) {
        return React__default["default"].createElement(PromptControl, null);
    }
};
PromptControl.Container = Container;
PromptControl.Header = HeaderText;
PromptControl.Icon = AIIcon;
PromptControl.PromptGroup = PromptGroup;
PromptControl.PromptCard = PromptCard;

function Conversation() {
    return (React__default["default"].createElement(ViewElement, { style: {
            width: '584px',
            maxHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
        } },
        React__default["default"].createElement(HeaderControl, null),
        React__default["default"].createElement(ViewElement, { style: {
                borderLeft: '1px solid rgba(220, 222, 224, 1)',
                borderRight: '1px solid rgba(220, 222, 224, 1)',
                padding: '0px 16px',
                overflowY: 'auto',
                flexShrink: '1',
                display: 'flex',
                flexDirection: 'column-reverse',
            } },
            React__default["default"].createElement(AutoHidablePromptControl, null),
            React__default["default"].createElement(MessagesControl, null)),
        React__default["default"].createElement(ViewElement, { style: {
                border: '1px solid rgba(220, 222, 224, 1)',
                borderTop: 'none',
                borderRadius: '0px 0px 16px 16px',
                flex: '0 0 auto',
                padding: '0px 16px',
            } },
            React__default["default"].createElement(FieldControl, null))));
}

const ResponseComponentsContext = React__default["default"].createContext(undefined);
const ResponseComponentsProvider = ({ children, responseComponents, }) => {
    return (React__default["default"].createElement(ResponseComponentsContext.Provider, { value: responseComponents }, children));
};

function createProvider({ elements: elements$1, actions, suggestedPrompts, responseComponents, variant, }) {
    return function Provider({ children, messages, avatars, handleSendMessage, }) {
        return (React__default["default"].createElement(elements.ElementsProvider, { elements: elements$1 },
            React__default["default"].createElement(SuggestedPromptProvider, { suggestedPrompts: suggestedPrompts },
                React__default["default"].createElement(ResponseComponentsProvider, { responseComponents: responseComponents },
                    React__default["default"].createElement(InputContextProvider, null,
                        React__default["default"].createElement(SendMessageContextProvider, { handleSendMessage: handleSendMessage },
                            React__default["default"].createElement(AvatarsProvider, { avatars: avatars },
                                React__default["default"].createElement(ActionsProvider, { actions: actions },
                                    React__default["default"].createElement(MessageVariantProvider, { variant: variant },
                                        React__default["default"].createElement(MessagesProvider, { messages: messages }, children))))))))));
    };
}

function createAIConversation(input = {}) {
    const { elements, suggestedPrompts, actions, responseComponents, variant } = input;
    const Provider = createProvider({
        elements,
        actions,
        suggestedPrompts,
        responseComponents,
        variant,
    });
    function AIConversation(props) {
        const { messages, avatars, handleSendMessage } = props;
        return (React__default["default"].createElement(Provider, { messages: messages, avatars: avatars, handleSendMessage: handleSendMessage },
            React__default["default"].createElement(Conversation, null)));
    }
    const Controls = {
        // @ts-expect-error TODO fix type error
        ActionsBar: ActionsBarControl,
        // @ts-expect-error TODO fix type error
        Avatars: AvatarControl,
        // @ts-expect-error TODO fix type error
        Field: FieldControl,
        // @ts-expect-error TODO fix type error
        Header: HeaderControl,
        // @ts-expect-error TODO fix type error
        Messages: MessagesControl,
        // @ts-expect-error TODO fix type error
        SuggestedPrompts: PromptControl,
    };
    AIConversation.Provider = Provider;
    AIConversation.Conversation = Conversation;
    AIConversation.Controls = Controls;
    return { AIConversation };
}

function createUseAIGeneration(_client) {
    const useAIGeneration = (_routeName, _input) => {
        // return useDataState(client.ai.generation as T['ai'])[routeName].generate, { messages: [] });
        // const generate = client.ai.generate as T['ai'])[routeName];
        // const newAction = async (_prev: { result: string }, _input: GenerateParameters) => {
        //   const result = await generate(_input);
        //   return { result }
        // }
        const updateAIGenerationStateAction = async (_prev, _input) => {
            await new Promise((r) => setTimeout(r, 500));
            return { result: 'generatedresult' };
        };
        return uiReactCore.useDataState(updateAIGenerationStateAction, {});
    };
    return useAIGeneration;
}

const AIContext = React__default["default"].createContext(undefined);
const useAIContext = () => {
    const context = React__default["default"].useContext(AIContext);
    const [routeToConversationsMap, setRouteToConversationsMap] = React__default["default"].useState({});
    if (context) {
        return context;
    }
    return { routeToConversationsMap, setRouteToConversationsMap };
};
const AIContextProvider = ({ children, }) => {
    const context = useAIContext();
    return React__default["default"].createElement(AIContext.Provider, { value: context }, children);
};

function createNewConversationMessageInRoute({ previousValue, routeName, conversationId, messages, }) {
    return {
        ...previousValue,
        [routeName]: {
            ...previousValue[routeName],
            [conversationId]: messages,
        },
    };
}
function createUseAIConversation(client) {
    const useAIConversation = (routeName, input = {}) => {
        const clientRoute = client.conversations[routeName];
        const { routeToConversationsMap, setRouteToConversationsMap } = useAIContext();
        const messagesFromAIContext = input.id
            ? routeToConversationsMap[routeName]?.[input.id]
            : undefined;
        const [localMessages, setLocalMessages] = React__default["default"].useState(messagesFromAIContext ?? []);
        const [conversation, setConversation] = React__default["default"].useState(undefined);
        const [waitingForAIResponse, setWaitingForAIResponse] = React__default["default"].useState(false);
        const [errorMessage, setErrorMessage] = React__default["default"].useState();
        const [hasError, setHasError] = React__default["default"].useState(false);
        // On hook initialization get conversation and load all messages
        React__default["default"].useEffect(() => {
            async function initialize() {
                const { data: conversation } = input.id
                    ? await clientRoute.get({ id: input.id })
                    : await clientRoute.create();
                if (!conversation) {
                    const errorString = 'No conversation found';
                    setHasError(true);
                    setErrorMessage(errorString);
                    throw new Error(errorString);
                }
                const { data: messages } = await conversation.listMessages();
                setLocalMessages(messages);
                setConversation(conversation);
                setRouteToConversationsMap((previousValue) => {
                    return createNewConversationMessageInRoute({
                        previousValue,
                        routeName: routeName,
                        conversationId: conversation.id,
                        messages,
                    });
                });
            }
            initialize();
        }, [clientRoute, input.id, routeName, setRouteToConversationsMap]);
        // Update messages to match what is in AIContext if they aren't equal
        React__default["default"].useEffect(() => {
            if (!!messagesFromAIContext && messagesFromAIContext !== localMessages)
                setLocalMessages(messagesFromAIContext);
        }, [messagesFromAIContext, localMessages]);
        const sendMessage = React__default["default"].useCallback((input) => {
            const { content, aiContext } = input;
            conversation
                ?.sendMessage({ content, aiContext })
                .then((value) => {
                const { data: sentMessage } = value;
                if (sentMessage) {
                    setWaitingForAIResponse(true);
                    setLocalMessages((previousLocalMessages) => [
                        ...previousLocalMessages,
                        sentMessage,
                    ]);
                    setRouteToConversationsMap((previousValue) => {
                        return createNewConversationMessageInRoute({
                            previousValue,
                            routeName: routeName,
                            conversationId: conversation.id,
                            messages: [
                                ...previousValue[routeName][conversation.id],
                                sentMessage,
                            ],
                        });
                    });
                }
            })
                .catch((reason) => {
                setHasError(true);
                setErrorMessage(`error sending message ${reason}`);
            });
        }, [conversation, routeName, setRouteToConversationsMap]);
        const subscribe = React__default["default"].useCallback((handleStoreChange) => {
            const subscription = conversation &&
                conversation.onMessage((message) => {
                    if (input.onResponse)
                        input.onResponse(message);
                    setWaitingForAIResponse(false);
                    setLocalMessages((previousLocalMessages) => [
                        ...previousLocalMessages,
                        message,
                    ]);
                    setRouteToConversationsMap((previousValue) => {
                        return createNewConversationMessageInRoute({
                            previousValue,
                            routeName: routeName,
                            conversationId: conversation.id,
                            messages: [
                                ...previousValue[routeName][conversation.id],
                                message,
                            ],
                        });
                    });
                    handleStoreChange(); // should cause a re-render
                });
            return () => {
                subscription?.unsubscribe();
            };
        }, [conversation, routeName, setRouteToConversationsMap, input]);
        const getSnapshot = React__default["default"].useCallback(() => localMessages, [localMessages]);
        // Using useSyncExternalStore to subscribe to external data updates
        // Have to provide third optional argument in next - https://github.com/vercel/next.js/issues/54685
        const messagesFromStore = React__default["default"].useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
        return [
            {
                data: { messages: messagesFromStore },
                isLoading: waitingForAIResponse,
                message: errorMessage,
                hasError,
            },
            sendMessage,
        ];
    };
    return useAIConversation;
}

function createAIHooks(_client) {
    const useAIConversation = createUseAIConversation(_client);
    const useAIGeneration = createUseAIGeneration();
    return { useAIConversation, useAIGeneration };
}

exports.AIContextProvider = AIContextProvider;
exports.createAIConversation = createAIConversation;
exports.createAIHooks = createAIHooks;
