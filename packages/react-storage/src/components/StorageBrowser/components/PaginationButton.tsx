import React from 'react';

import { CLASS_BASE } from '../views/constants';
import {
  ButtonElement,
  IconElement,
  InputElementProps,
} from '../context/elements';

type ButtonType = 'previous' | 'next';

export interface PaginationButtonProps extends InputElementProps {
  isDisabled?: boolean;
  onClick?: () => void;
  type?: ButtonType;
}

const BLOCK_NAME = `${CLASS_BASE}__pagination-button`;

export function PaginationButton({
  isDisabled,
  onClick,
  type,
}: PaginationButtonProps): React.JSX.Element | null {
  if (!type) return null;

  const buttonType: `paginate-${ButtonType}` = `paginate-${type}`;

  return (
    <ButtonElement
      aria-label={`Go to ${type} page`}
      className={`${BLOCK_NAME}--${buttonType}`}
      disabled={isDisabled}
      onClick={onClick}
      variant={buttonType}
    >
      <IconElement className={`${BLOCK_NAME}-icon`} variant={buttonType} />
    </ButtonElement>
  );
}
