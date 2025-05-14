import React from 'react';

import type { ImageDimensions } from '../../hooks';
import { useMessageProps } from '../../hooks';
import { MessageWrapper } from '../MessageWrapper';
import { MessageLayout } from '../MessageLayout';

import { getStyles, positionStyle } from './styles';
import type { BannerMessageProps } from './types';

export default function BannerMessage({
  position = 'top',
  ...props
}: BannerMessageProps): React.JSX.Element | null {
  const messageProps = useMessageProps(
    props,
    (imageDimensions: ImageDimensions) =>
      getStyles(imageDimensions, { position: { ...positionStyle[position] } })
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
        orientation="landscape"
        styles={messageStyles}
        testID={`inappmessaging-${position}banner-dialog`}
      />
    </MessageWrapper>
  );
}
