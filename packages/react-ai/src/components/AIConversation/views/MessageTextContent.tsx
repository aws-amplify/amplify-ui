import React from 'react';
import { TextElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';

const BLOCK_NAME = 'message';
const _className = `${BLOCK_NAME}__text`;

export const MessageTextContent = React.forwardRef<
  TextElementProps['ref'],
  TextElementProps
>(({ children, className = _className, ...props }, ref) => {
  const Text = useElement('Text');
  return (
    <Text className={className} {...props} ref={ref}>
      {children ?? 'Message text content'}
    </Text>
  );
});

MessageTextContent.displayName = 'MessageTextContent';
