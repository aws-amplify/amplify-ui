import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { ConversationMessage } from '../../types';

import { ActionsContext } from '../../context';
import { AIConversationElements } from '../../context/elements';

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

export const ActionsBarControl: ActionsBarControl = ({ message }) => {
  const actions = React.useContext(ActionsContext);
  return (
    <Container>
      {actions?.map((action, index) => (
        <ActionButton
          aria-label={action.displayName}
          key={index}
          onClick={() => action.handler(message)}
        >
          <ActionIcon data-testid={`action-icon-${action.displayName}`}>
            {action.icon}
          </ActionIcon>
        </ActionButton>
      ))}
    </Container>
  );
};

ActionsBarControl.Button = ActionButton;
ActionsBarControl.Container = Container;
ActionsBarControl.Icon = ActionIcon;

export interface ActionsBarControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: { message: ConversationMessage }): React.JSX.Element;
  Button: T['Button'];
  Container: T['View'];
  Icon: T['Span'];
}
