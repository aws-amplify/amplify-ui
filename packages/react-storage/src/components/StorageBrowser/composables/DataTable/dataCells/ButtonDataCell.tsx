import React from 'react';

import {
  ButtonElement,
  ButtonElementVariant,
  IconElement,
  IconVariant,
} from '../../../context/elements';
import { CLASS_BASE } from '../../../views/constants';

export interface ButtonDataCellProps {
  content: {
    icon?: IconVariant;
    label?: string;
    onClick?: () => void;
    ariaLabel?: string;
    isDisabled?: boolean;
  };
}

export const ButtonDataCell = ({
  content,
}: ButtonDataCellProps): React.JSX.Element => {
  const { ariaLabel, isDisabled, icon, label, onClick } = content;

  // Special handling for icon-only cancel buttons
  let buttonVariant: ButtonElementVariant = 'table-data';
  const isIconOnlyButton = !!icon && !label;
  if (isIconOnlyButton && icon === 'cancel') {
    buttonVariant = 'cancel';
  }

  return (
    <ButtonElement
      className={[
        `${CLASS_BASE}__table-button-data-cell`,
        isIconOnlyButton
          ? `${CLASS_BASE}__table-button-data-cell--icon-only`
          : '',
      ].join(' ')}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      variant={buttonVariant}
    >
      {icon && (
        <IconElement
          className={`${CLASS_BASE}__table-button-data-cell-icon--${icon}`}
          variant={icon}
        />
      )}
      {label}
    </ButtonElement>
  );
};