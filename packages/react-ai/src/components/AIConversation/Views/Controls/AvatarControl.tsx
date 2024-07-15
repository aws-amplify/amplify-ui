import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { Avatar } from '../../types';
import { AIConversationElements } from '../../context/elements';
const { Span, Text, View } = AIConversationElements;

const AVATAR_BLOCK = 'ai-avatar';

const iconAttributes = {
  className: `${AVATAR_BLOCK}__icon`,
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const avatarIconProps = () => ({
  children: (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        d="M14.023,12.154c1.514-1.192,2.488-3.038,2.488-5.114c0-3.597-2.914-6.512-6.512-6.512
								c-3.597,0-6.512,2.916-6.512,6.512c0,2.076,0.975,3.922,2.489,5.114c-2.714,1.385-4.625,4.117-4.836,7.318h1.186
								c0.229-2.998,2.177-5.512,4.86-6.566c0.853,0.41,1.804,0.646,2.813,0.646c1.01,0,1.961-0.236,2.812-0.646
								c2.684,1.055,4.633,3.568,4.859,6.566h1.188C18.648,16.271,16.736,13.539,14.023,12.154z M10,12.367
								c-2.943,0-5.328-2.385-5.328-5.327c0-2.943,2.385-5.328,5.328-5.328c2.943,0,5.328,2.385,5.328,5.328
								C15.328,9.982,12.943,12.367,10,12.367z"
      ></path>
    </svg>
  ),
  ...iconAttributes,
});

const AvatarDisplayName = withBaseElementProps(Text, {
  className: `${AVATAR_BLOCK}__display-name`,
});

const AvatarIcon = withBaseElementProps(Span, avatarIconProps);

const Container = withBaseElementProps(View, {
  className: `${AVATAR_BLOCK}__container`,
});

export const AvatarControl: AvatarControl = ({
  avatar
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
  Icon: T['Span'];
}
