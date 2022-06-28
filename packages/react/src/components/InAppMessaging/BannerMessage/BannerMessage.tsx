import React from 'react';

import { ImageDimensions, useMessageProps } from '../hooks';
import { MessageWrapper } from '../MessageWrapper';
import { MessageLayout } from '../MessageLayout';

import { getStyles, positionStyle } from './styles';
import { BannerMessageProps } from './types';

export default function BannerMessage({
  position = 'top',
  ...props
}: BannerMessageProps): JSX.Element | null {
  const messageProps = useMessageProps(
    props,
    (imageDimensions: ImageDimensions) =>
      getStyles(imageDimensions, { position: { ...positionStyle[position] } })
  );
  const { shouldRenderMessage, styles } = messageProps;
  console.log('shouldRenderMessage', shouldRenderMessage);
  console.log('banner message props', props);

  if (!shouldRenderMessage) {
    return null;
  }

  const { wrapper, ...messageStyles } = styles!;

  return (
    <MessageWrapper style={wrapper}>
      <MessageLayout {...props} {...messageProps} styles={messageStyles} />
    </MessageWrapper>
  );
}
