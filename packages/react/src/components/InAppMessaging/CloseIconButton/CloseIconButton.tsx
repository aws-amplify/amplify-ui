import * as React from 'react';

import { Link } from '../../../primitives';
import { IconClose } from '../../../primitives/Icon/internal';

import { CloseIconButtonProps } from './types';

export function CloseIconButton({
  className,
  onClick,
  style,
  ...rest
}: CloseIconButtonProps): JSX.Element {
  return (
    <Link className={className} onClick={onClick} style={style} {...rest}>
      <IconClose size="1.5rem" />
    </Link>
  );
}
