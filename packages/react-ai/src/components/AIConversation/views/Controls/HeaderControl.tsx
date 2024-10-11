import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { AIConversationElements } from '../../context/elements';

const { View, Button, Icon, Text } = AIConversationElements;

const HEADER_BLOCK = 'ai-header';

const HeaderTextBase = withBaseElementProps(Text, {
  className: `${HEADER_BLOCK}__text`,
});

const HeaderText: typeof HeaderTextBase = React.forwardRef(
  function HeaderText(props, ref) {
    return <HeaderTextBase {...props} ref={ref} />;
  }
);

const CloseIcon = withBaseElementProps(Icon, {
  className: `${HEADER_BLOCK}__icon`,
  variant: 'close',
});

const CloseButtonBase = withBaseElementProps(Button, {
  className: `${HEADER_BLOCK}__button`,
});

const CloseButton: typeof CloseButtonBase = React.forwardRef(
  function CloseButton(props, ref) {
    return <CloseButtonBase {...props} ref={ref} />;
  }
);

const Container = withBaseElementProps(View, {
  className: `${HEADER_BLOCK}__container`,
});

export const HeaderControl: HeaderControl = () => (
  <Container>
    <HeaderText>Raven Chat</HeaderText>
    <CloseButton>
      <CloseIcon />
    </CloseButton>
  </Container>
);

HeaderControl.Container = Container;
HeaderControl.Text = HeaderText;
HeaderControl.Button = CloseButton;

export interface HeaderControl {
  (): React.JSX.Element;
  Container: AIConversationElements['View'];
  Button: AIConversationElements['Button'];
  Text: AIConversationElements['Text'];
}
