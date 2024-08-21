import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { ActionsContext } from '../../context/ActionsContext.mjs';
import '../../context/AvatarsContext.mjs';
import '../../context/InputContext.mjs';
import '../../context/MessagesContext.mjs';
import '../../context/SuggestedPromptsContext.mjs';
import '../../context/MessageVariantContext.mjs';
import { AIConversationElements } from '../../context/elements/definitions.mjs';

const { Button, Span, View } = AIConversationElements;
const ACTIONS_BAR_BLOCK = 'ai-actions-bar';
const ActionIcon = withBaseElementProps(Span, {
    'aria-hidden': 'true',
    className: `${ACTIONS_BAR_BLOCK}__icon`,
});
const ActionButtonBase = withBaseElementProps(Button, {
    className: `${ACTIONS_BAR_BLOCK}__button`,
});
const ActionButton = React.forwardRef(function ActionButton(props, ref) {
    return React.createElement(ActionButtonBase, { ...props, ref: ref });
});
const Container = withBaseElementProps(View, {
    className: `${ACTIONS_BAR_BLOCK}__container`,
});
const ActionsBarControl = ({ message, focusable, }) => {
    const actions = React.useContext(ActionsContext);
    return (React.createElement(Container, null, actions?.map((action, index) => (React.createElement(ActionButton, { "aria-label": action.displayName, key: index, onClick: () => action.handler(message), tabIndex: focusable ? 0 : -1 },
        React.createElement(ActionIcon, { "data-testid": `action-icon-${action.displayName}` }, action.icon))))));
};
ActionsBarControl.Button = ActionButton;
ActionsBarControl.Container = Container;
ActionsBarControl.Icon = ActionIcon;

export { ActionsBarControl };
