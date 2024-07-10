import React from 'react';
import { ImageElement as Image, ImageElementProps } from '../types';

const BLOCK_NAME = 'message';
const _className = `${BLOCK_NAME}__image`;

export const MessageMediaContent = React.forwardRef<
  ImageElementProps['ref'],
  ImageElementProps
>(({ children, className = _className, ...props }, ref) => {
  return (
    <Image className={className} {...props} ref={ref}>
      {children}
    </Image>
  );
});

MessageMediaContent.displayName = 'MessageMediaContent';
