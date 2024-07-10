import React from 'react';
import { useElement } from '../context/elements';
import { TextElementProps } from '@aws-amplify/ui-react/internal';

const BLOCK_NAME = 'avatar';
const _className = `${BLOCK_NAME}__text`;

export const AvatarDisplayName = React.forwardRef<
  TextElementProps['ref'],
  TextElementProps
>(({ children, className = _className, ...props }, ref) => {
  const Text = useElement('Text');

  return (
    <Text className={className} {...props} ref={ref}>
      {children ?? 'avatar display name'}
    </Text>
  );
});

AvatarDisplayName.displayName = 'AvatarDisplayName';
