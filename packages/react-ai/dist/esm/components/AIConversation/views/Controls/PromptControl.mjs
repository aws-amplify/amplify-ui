import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import '../../context/ActionsContext.mjs';
import '../../context/AvatarsContext.mjs';
import { InputContext } from '../../context/InputContext.mjs';
import { MessagesContext } from '../../context/MessagesContext.mjs';
import { SuggestedPromptsContext } from '../../context/SuggestedPromptsContext.mjs';
import '../../context/MessageVariantContext.mjs';
import { AIConversationElements } from '../../context/elements/definitions.mjs';
import { classNames } from '@aws-amplify/ui';

const { View, Button, Text, Heading, Icon } = AIConversationElements;
const PROMPT_BLOCK = 'ai-prompts';
const PROMPT_CONTROL = `${PROMPT_BLOCK}__prompt`;
const PROMPT_CARD = `${PROMPT_CONTROL}__card`;
const PromptCard = withBaseElementProps(Button, {
    className: PROMPT_CARD,
    type: 'button',
});
const AIIconProps = () => ({
    children: (React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M17.5 1.64858C19.047 0.755412 20.953 0.755412 22.5 1.64858L34.6428 8.65923C36.1898 9.55239 37.1428 11.203 37.1428 12.9894V27.0107C37.1428 28.797 36.1898 30.4476 34.6428 31.3408L22.5 38.3514C20.953 39.2446 19.047 39.2446 17.5 38.3514L5.35718 31.3408C3.81017 30.4476 2.85718 28.797 2.85718 27.0107V12.9894C2.85718 11.203 3.81017 9.55239 5.35718 8.65923L17.5 1.64858Z", fill: "white" }),
        React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M22.5 1.64851C20.953 0.755347 19.047 0.755347 17.5 1.64851L5.35718 8.65916C3.81017 9.55233 2.85718 11.203 2.85718 12.9893V27.0106C2.85718 28.7969 3.81017 30.4476 5.35718 31.3407L17.5 38.3514C19.047 39.2445 20.953 39.2445 22.5 38.3514L34.6428 31.3407C36.1898 30.4476 37.1428 28.7969 37.1428 27.0106V12.9893C37.1428 11.203 36.1898 9.55233 34.6428 8.65916L22.5 1.64851ZM20.9378 8.01826C20.6156 7.14764 19.3843 7.14764 19.0621 8.01825L16.2388 15.648C16.1375 15.9217 15.9217 16.1375 15.648 16.2388L8.01826 19.0621C7.14765 19.3842 7.14765 20.6156 8.01826 20.9378L15.648 23.7611C15.9217 23.8623 16.1375 24.0782 16.2388 24.3519L19.0621 31.9816C19.3843 32.8522 20.6156 32.8522 20.9378 31.9816L23.7611 24.3519C23.8624 24.0782 24.0782 23.8623 24.3519 23.7611L31.9816 20.9378C32.8523 20.6156 32.8523 19.3842 31.9816 19.0621L24.3519 16.2388C24.0782 16.1375 23.8624 15.9217 23.7611 15.648L20.9378 8.01826Z", fill: "url(#paint0_linear_395_1815)" }),
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: "paint0_linear_395_1815", x1: "20", y1: "0.978638", x2: "20", y2: "39.0213", gradientUnits: "userSpaceOnUse" },
                React.createElement("stop", { stopColor: "#7DD6E8" }),
                React.createElement("stop", { offset: "1", stopColor: "#BF40BF" }))))),
    className: `${PROMPT_CONTROL}__icon`,
    width: '40',
    height: '40',
    viewBox: '0 0 40 40',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
});
const AIIcon = withBaseElementProps(Icon, AIIconProps);
const HeaderText = withBaseElementProps(Heading, {
    className: `${PROMPT_CONTROL}__header`,
});
const PromptGroupBase = withBaseElementProps(View, {
    className: `${PROMPT_CONTROL}__buttongroup`,
});
const PromptGroup = React.forwardRef(function ButtonGroup(props, ref) {
    const suggestedPromptsArray = React.useContext(SuggestedPromptsContext);
    const { setInput } = React.useContext(InputContext);
    if (!suggestedPromptsArray) {
        return;
    }
    return (React.createElement(PromptGroupBase, { ...props, ref: ref }, suggestedPromptsArray.map((prompt, index) => {
        return (React.createElement(PromptCard, { key: index, "aria-label": prompt.inputText, onClick: () => setInput &&
                setInput((prevInput) => ({
                    ...prevInput,
                    text: prompt.inputText,
                })) },
            React.createElement(Text, { className: classNames(`${PROMPT_CARD}__header`, `${PROMPT_CARD}__text`) }, prompt.header),
            React.createElement(Text, { className: `${PROMPT_CARD}__text` }, prompt.inputText)));
    })));
});
const Container = withBaseElementProps(View, {
    className: `${PROMPT_BLOCK}__container`,
});
const PromptControl = () => (React.createElement(Container, null,
    React.createElement(AIIcon, null),
    React.createElement(HeaderText, null, "How can I help you today?"),
    React.createElement(PromptGroup, null)));
const AutoHidablePromptControl = () => {
    const messages = React.useContext(MessagesContext);
    if (!messages || messages.length === 0) {
        return React.createElement(PromptControl, null);
    }
};
PromptControl.Container = Container;
PromptControl.Header = HeaderText;
PromptControl.Icon = AIIcon;
PromptControl.PromptGroup = PromptGroup;
PromptControl.PromptCard = PromptCard;

export { AutoHidablePromptControl, PromptControl };
