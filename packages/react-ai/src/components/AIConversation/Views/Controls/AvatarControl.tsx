import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { Avatar } from '../../types';
import { AIConversationElements } from '../../context/elements';
const { Icon, Text, View } = AIConversationElements;

const AVATAR_BLOCK = 'ai-avatar';

const avatarIconProps = () => ({
  children: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 1.29835C14.7624 0.583818 13.2376 0.583819 12 1.29835L4.00006 5.91713C2.76246 6.63166 2.00006 7.95217 2.00006 9.38123V18.6188C2.00006 20.0479 2.76246 21.3684 4.00006 22.0829L12 26.7017C13.2376 27.4162 14.7624 27.4162 16 26.7017L24 22.0829C25.2376 21.3684 26 20.0479 26 18.6188V9.38123C26 7.95217 25.2376 6.63166 24 5.91713L16 1.29835ZM14.9379 6.37319C14.6157 5.50257 13.3843 5.50257 13.0622 6.37319L11.4151 10.8243C11.3138 11.098 11.098 11.3138 10.8243 11.4151L6.37317 13.0622C5.50256 13.3843 5.50256 14.6157 6.37317 14.9379L10.8243 16.5849C11.098 16.6862 11.3138 16.902 11.4151 17.1757L13.0622 21.6268C13.3843 22.4975 14.6157 22.4975 14.9379 21.6268L16.5849 17.1757C16.6862 16.902 16.902 16.6862 17.1757 16.5849L21.6268 14.9379C22.4974 14.6157 22.4974 13.3843 21.6268 13.0622L17.1757 11.4151C16.902 11.3138 16.6862 11.098 16.5849 10.8243L14.9379 6.37319Z"
      fill="#0D1A26"
    />
  ),
  className: `${AVATAR_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: '#0D1A26',
  xmlns: 'http://www.w3.org/2000/svg',
});

const AvatarDisplayName = withBaseElementProps(Text, {
  className: `${AVATAR_BLOCK}__display-name`,
});

const AvatarIcon = withBaseElementProps(Icon, avatarIconProps);

const Container = withBaseElementProps(View, {
  className: `${AVATAR_BLOCK}__container`,
});

export const AvatarControl: AvatarControl = ({
  avatar = { username: 'AI', avatar: <div>AI Icon</div> },
}) => {
  return (
    <Container>
      <AvatarIcon>{avatar.avatar}</AvatarIcon>
      <AvatarDisplayName>{avatar.username}</AvatarDisplayName>
    </Container>
  );
};

AvatarControl.Container = Container;
AvatarControl.DisplayName = AvatarDisplayName;
AvatarControl.Icon = AvatarIcon;

export interface AvatarControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: { avatar: Avatar }): React.JSX.Element;
  Container: T['View'];
  DisplayName: T['Text'];
  Icon: T['Icon'];
}
