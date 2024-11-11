import React from 'react';

import { CLASS_BASE } from '../views/constants';
import {
  ButtonElement,
  IconElement,
  InputElementProps,
} from '../context/elements';

interface PaginationButtonProps extends InputElementProps {
  disabled: boolean;
  onClick: () => void;
  type: 'previous' | 'next';
}

const BLOCK_NAME = `${CLASS_BASE}__pagination-button`;

export function PaginationButton({
  disabled,
  onClick,
  type,
}: PaginationButtonProps): React.JSX.Element {
  const buttonType: 'paginate-previous' | 'paginate-next' = `paginate-${type}`;

  return (
    <ButtonElement
      aria-label={`Go to ${type} page`}
      className={`${BLOCK_NAME}--${buttonType}`}
      disabled={disabled}
      onClick={onClick}
      variant={buttonType}
    >
      <IconElement className={`${BLOCK_NAME}-icon`} variant={buttonType} />
    </ButtonElement>
  );
}
