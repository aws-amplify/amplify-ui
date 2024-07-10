import React from 'react';
import { ParagraphElement as Paragraph, ParagraphElementProps } from '../types';

const BLOCK_NAME = 'avatar';
const _className = `${BLOCK_NAME}__text`;

export const AvatarDisplayName = React.forwardRef<
  ParagraphElementProps['ref'],
  ParagraphElementProps
>(({ children, className = _className, ...props }, ref) => {
  return (
    <Paragraph className={className} {...props} ref={ref}>
      {children ?? 'avatar display name'}
    </Paragraph>
  );
});

AvatarDisplayName.displayName = 'AvatarDisplayName';
