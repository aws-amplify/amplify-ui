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

const closeIconProps = () => ({
  children: (
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill="currentColor"
    />
  ),
  className: `${HEADER_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

const CloseIcon = withBaseElementProps(Icon, closeIconProps);

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

export const HeaderControl: HeaderControl = ({ title }) => (
  <Container>
    <HeaderText>{title}</HeaderText>
    <CloseButton>
      <CloseIcon />
    </CloseButton>
  </Container>
);

HeaderControl.Container = Container;
HeaderControl.Text = HeaderText;
HeaderControl.Button = CloseButton;

export interface HeaderControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: { title: string }): React.JSX.Element;
  Container: T['View'];
  Button: T['Button'];
  Text: T['Text'];
}
