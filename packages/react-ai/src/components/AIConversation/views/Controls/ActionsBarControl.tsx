import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { ActionsContext } from '../../context';
import { AIConversationElements } from '../../context/elements';
import { ConversationMessage } from '../../../../types';

const { Button, Span, View } = AIConversationElements;

const ACTIONS_BAR_BLOCK = 'ai-actions-bar';

const ActionIcon = withBaseElementProps(Span, {
  'aria-hidden': 'true',
  className: `${ACTIONS_BAR_BLOCK}__icon`,
});

const ActionButtonBase = withBaseElementProps(Button, {
  className: `${ACTIONS_BAR_BLOCK}__button`,
});

const ActionButton: typeof ActionButtonBase = React.forwardRef(
  function ActionButton(props, ref) {
    return <ActionButtonBase {...props} ref={ref} />;
  }
);

const Container = withBaseElementProps(View, {
  className: `${ACTIONS_BAR_BLOCK}__container`,
});

export const ActionsBarControl: ActionsBarControl = ({
  message,
  focusable,
}) => {
  const actions = React.useContext(ActionsContext);
  return (
    <Container>
      {actions?.map((action, index) => (
        <ActionButton
          key={index}
          onClick={() => action.handler(message)}
          tabIndex={focusable ? 0 : -1}
        >
          {action.component}
        </ActionButton>
      ))}
    </Container>
  );
};

ActionsBarControl.Button = ActionButton;
ActionsBarControl.Container = Container;
ActionsBarControl.Icon = ActionIcon;

export interface ActionsBarControl {
  (props: {
    message: ConversationMessage;
    focusable?: boolean;
  }): React.JSX.Element;
  Button: AIConversationElements['Button'];
  Container: AIConversationElements['View'];
  Icon: AIConversationElements['Span'];
}
