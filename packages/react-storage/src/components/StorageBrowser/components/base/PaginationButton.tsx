import React from 'react';

import type { InputElementProps } from '../elements';
import { ButtonElement, IconElement } from '../elements';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from './constants';

type ButtonType = 'previous' | 'next';

export interface PaginationButtonProps extends InputElementProps {
  isDisabled?: boolean;
  onClick?: () => void;
  type?: ButtonType;
}

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
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__pagination-button--${buttonType}`}
      disabled={isDisabled}
      onClick={onClick}
      variant={buttonType}
    >
      <IconElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__pagination-button-icon`}
        variant={buttonType}
      />
    </ButtonElement>
  );
}
