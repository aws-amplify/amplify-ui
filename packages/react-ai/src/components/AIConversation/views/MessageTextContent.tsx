import React from 'react';
import { TextElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';

const BLOCK_NAME = 'message';
const _className = `${BLOCK_NAME}__text`;

export const MessageTextContent = React.forwardRef<
  TextElementProps['ref'],
  TextElementProps
>(({ children, className = _className, ...props }, ref) => {
  const Image = useElement('Image');
  return (
    <Image className={className} {...props} ref={ref}>
      {children}
    </Image>
  );
});

MessageTextContent.displayName = 'MessageTextContent';
