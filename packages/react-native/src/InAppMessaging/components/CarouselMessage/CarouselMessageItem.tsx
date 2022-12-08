import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDeviceOrientation } from '../../../hooks';
import { useMessageProps } from '../../hooks';
import { MessageLayout } from '../MessageLayout';

import { getLandscapeStyles, getPortraitStyles } from './styles';
import { CarouselMessageItemProps } from './types';

export default function CarouselMessageItem(
  props: CarouselMessageItemProps
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
    <SafeAreaView style={wrapper}>
      <MessageLayout
        {...props}
        {...messageProps}
        orientation={deviceOrientation}
        styles={messageStyles}
      />
    </SafeAreaView>
  );
}
