import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { AIConversationElements } from '../../context/elements/definitions.mjs';

const { View, Button, Icon, Text } = AIConversationElements;
const HEADER_BLOCK = 'ai-header';
const HeaderTextBase = withBaseElementProps(Text, {
    className: `${HEADER_BLOCK}__text`,
});
const HeaderText = React.forwardRef(function HeaderText(props, ref) {
    return React.createElement(HeaderTextBase, { ...props, ref: ref });
});
const CloseIcon = withBaseElementProps(Icon, {
    className: `${HEADER_BLOCK}__icon`,
    variant: 'close',
});
const CloseButtonBase = withBaseElementProps(Button, {
    className: `${HEADER_BLOCK}__button`,
});
const CloseButton = React.forwardRef(function CloseButton(props, ref) {
    return React.createElement(CloseButtonBase, { ...props, ref: ref });
});
const Container = withBaseElementProps(View, {
    className: `${HEADER_BLOCK}__container`,
});
const HeaderControl = () => (React.createElement(Container, null,
    React.createElement(HeaderText, null, "Raven Chat"),
    React.createElement(CloseButton, null,
        React.createElement(CloseIcon, null))));
HeaderControl.Container = Container;
HeaderControl.Text = HeaderText;
HeaderControl.Button = CloseButton;

export { HeaderControl };
