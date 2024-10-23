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
  };
}

export const ButtonDataCell = ({
  content,
}: ButtonDataCellProps): React.JSX.Element => {
  const { icon, label, onClick } = content;

  // Special handling for icon-only cancel buttons
  let buttonVariant: ButtonElementVariant = 'table-data';
  if (icon === 'cancel' && !label) {
    buttonVariant = 'cancel';
  }

  return (
    <ButtonElement
      className={`${CLASS_BASE}__table-button-data-cell`}
      onClick={onClick}
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
