import React from 'react';
import { ParagraphElement as Paragraph, ParagraphElementProps } from '../types';

const BLOCK_NAME = 'message';
const _className = `${BLOCK_NAME}__text`;

export const MessageTextContent = React.forwardRef<
  ParagraphElementProps['ref'],
  ParagraphElementProps
>(({ children, className = _className, ...props }, ref) => {
  return (
    <Paragraph className={className} {...props} ref={ref}>
      {children ?? 'Message text content'}
    </Paragraph>
  );
});

MessageTextContent.displayName = 'MessageTextContent';
