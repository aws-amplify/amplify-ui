import * as React from 'react';

import { Button } from '@aws-amplify/ui-react';
import { IconClose } from '@aws-amplify/ui-react/internal';

import { CloseIconButtonProps } from './types';

export function CloseIconButton({
  className,
  dismissButtonLabel = 'Dismiss message',
  onClick,
  style,
  ...rest
}: CloseIconButtonProps): JSX.Element {
  return (
    <Button
      ariaLabel={dismissButtonLabel}
      className={className}
      onClick={onClick}
      style={style}
      variation="link"
      {...rest}
    >
      <IconClose aria-hidden="true" size="1.5rem" />
    </Button>
  );
}
