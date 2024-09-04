import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { AvatarsContext } from '../../context';
import { RoleContext } from '../../context';
import { AIConversationElements } from '../../context/elements';

const { Icon, Span, Text, View } = AIConversationElements;

const AVATAR_BLOCK = 'ai-avatar';

const DEFAULT_USER_ICON = withBaseElementProps(Icon, {
  variant: 'user-avatar',
});

const DEFAULT_AI_ICON = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="raven-logo">
      <path
        id="Subtract"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 1.29833C14.7624 0.583803 13.2376 0.583804 12 1.29833L4.00006 5.91711C2.76246 6.63165 2.00006 7.95216 2.00006 9.38122V18.6188C2.00006 20.0478 2.76246 21.3684 4.00006 22.0829L12 26.7017C13.2376 27.4162 14.7624 27.4162 16 26.7017L24 22.0829C25.2376 21.3684 26 20.0478 26 18.6188V9.38122C26 7.95215 25.2376 6.63164 24 5.91711L16 1.29833ZM14.9379 6.37317C14.6157 5.50255 13.3843 5.50255 13.0622 6.37317L11.4151 10.8243C11.3138 11.098 11.098 11.3138 10.8243 11.4151L6.37317 13.0621C5.50256 13.3843 5.50256 14.6157 6.37317 14.9378L10.8243 16.5849C11.098 16.6862 11.3138 16.902 11.4151 17.1757L13.0622 21.6268C13.3843 22.4974 14.6157 22.4974 14.9379 21.6268L16.5849 17.1757C16.6862 16.902 16.902 16.6862 17.1757 16.5849L21.6268 14.9378C22.4974 14.6157 22.4974 13.3843 21.6268 13.0621L17.1757 11.4151C16.902 11.3138 16.6862 11.098 16.5849 10.8243L14.9379 6.37317Z"
        fill="#0D1A26"
      />
    </g>
  </svg>
);

const AvatarDisplayName = withBaseElementProps(Text, {
  className: `${AVATAR_BLOCK}__display-name`,
});

const AvatarIcon = withBaseElementProps(Span, {
  'aria-hidden': true,
  className: `${AVATAR_BLOCK}__icon`,
});

const Container = withBaseElementProps(View, {
  className: `${AVATAR_BLOCK}__container`,
});

export const AvatarControl: AvatarControl = () => {
  const avatars = React.useContext(AvatarsContext);
  const role = React.useContext(RoleContext);
  const avatar = role === 'assistant' ? avatars?.ai : avatars?.user;
  const defaultIcon =
    role === 'assistant' ? <DEFAULT_AI_ICON /> : <DEFAULT_USER_ICON />;
  const defaultDisplayName = role === 'user' ? 'User' : 'Assistant';
  return (
    <Container data-testid={'avatar'}>
      <AvatarIcon data-testid={`avatar-icon-${role}`}>
        {avatar?.avatar ?? defaultIcon}
      </AvatarIcon>
      <AvatarDisplayName>
        {avatar?.username ?? defaultDisplayName}
      </AvatarDisplayName>
    </Container>
  );
};

AvatarControl.Container = Container;
AvatarControl.DisplayName = AvatarDisplayName;
AvatarControl.Icon = AvatarIcon;

export interface AvatarControl {
  (): React.JSX.Element;
  Container: AIConversationElements['View'];
  DisplayName: AIConversationElements['Text'];
  Icon: AIConversationElements['Span'];
}
