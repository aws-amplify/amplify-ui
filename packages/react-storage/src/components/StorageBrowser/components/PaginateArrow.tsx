import React from 'react';

import { CLASS_BASE } from '../views/constants';
import {
  ButtonElement,
  IconElement,
  InputElementProps,
} from '../context/elements';

const BLOCK_NAME = `${CLASS_BASE}__paginate`;

interface PaginateArrowProps extends InputElementProps {
  disabled: boolean;
  onClick: () => void;
  type: 'previous' | 'next';
}
export function PaginateArrow({
  disabled,
  onClick,
  type,
}: PaginateArrowProps): React.JSX.Element {
  return (
    <ButtonElement
      aria-label={`Go to ${type} page`}
      className={`${BLOCK_NAME}__button-${type}`}
      disabled={disabled}
      onClick={onClick}
    >
      <IconElement
        className={`${BLOCK_NAME}__icon`}
        variant={`paginate-${type}`}
      />
    </ButtonElement>
  );
}
