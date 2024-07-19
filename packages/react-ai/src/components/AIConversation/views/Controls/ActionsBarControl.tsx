import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { ConversationMessage } from '../../types';

import { ActionsContext } from '../../context';
import { AIConversationElements } from '../../context/elements';

const { Button, Span, View } = AIConversationElements;

const ACTIONS_BAR_BLOCK = 'ai-actions-bar';

const iconAttributes = {
  'aria-hidden': true,
  className: `${ACTIONS_BAR_BLOCK}__icon`,
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const actionIconProps = () => ({
  children: (
    <path
      fill="none"
      d="M17.206,5.45l0.271-0.27l-4.275-4.274l-0.27,0.269V0.9H3.263c-0.314,0-0.569,0.255-0.569,0.569v17.062
    c0,0.314,0.255,0.568,0.569,0.568h13.649c0.313,0,0.569-0.254,0.569-0.568V5.45H17.206z M12.932,2.302L16.08,5.45h-3.148V2.302z
     M16.344,17.394c0,0.314-0.254,0.569-0.568,0.569H4.4c-0.314,0-0.568-0.255-0.568-0.569V2.606c0-0.314,0.254-0.568,0.568-0.568
    h7.394v4.55h4.55V17.394z"
    ></path>
  ),
  ...iconAttributes,
});

const ActionIcon = withBaseElementProps(Span, actionIconProps);

const ActionButtonBase = withBaseElementProps(Button, {
  className: `${ACTIONS_BAR_BLOCK}__button`,
});

const ActionButton: typeof ActionButtonBase = React.forwardRef(
  function ActionButton({ ...rest }, ref) {
    return <ActionButtonBase ref={ref} {...rest} />;
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
