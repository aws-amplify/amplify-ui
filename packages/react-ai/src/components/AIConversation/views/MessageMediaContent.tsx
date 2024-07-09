import React from 'react';
import { ImageElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';

const BLOCK_NAME = 'message';
const _className = `${BLOCK_NAME}__image`;

export const MessageMediaContent = React.forwardRef<
  ImageElementProps['ref'],
  ImageElementProps
>(({ children, className = _className, ...props }, ref) => {
  const Image = useElement('Image');
  return (
    <Image className={className} {...props} ref={ref}>
      {children}
    </Image>
  );
});

MessageMediaContent.displayName = 'MessageMediaContent';
