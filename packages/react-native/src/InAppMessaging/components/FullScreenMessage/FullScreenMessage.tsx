import React from 'react';

import { useDeviceOrientation } from '../../../hooks';

import { useMessageProps } from '../../hooks';
import { MessageLayout } from '../MessageLayout';
import { MessageWrapper } from '../MessageWrapper';

import { getLandscapeStyles, getPortraitStyles } from './styles';
import { FullScreenMessageProps } from './types';

export default function FullScreenMessage(
  props: FullScreenMessageProps
): JSX.Element | null {
  const { deviceOrientation, isPortraitMode } = useDeviceOrientation();
  const messageProps = useMessageProps(
    props,
    isPortraitMode ? getPortraitStyles : getLandscapeStyles
  );
  const { shouldRenderMessage, styles } = messageProps;

  if (!shouldRenderMessage) {
    return null;
  }

  const { wrapper, ...messageStyles } = styles!;

  return (
    <MessageWrapper style={wrapper}>
      <MessageLayout
        {...props}
        {...messageProps}
        orientation={deviceOrientation}
        styles={messageStyles}
        testID={`inappmessaging-fullscreen-dialog`}
      />
    </MessageWrapper>
  );
}
