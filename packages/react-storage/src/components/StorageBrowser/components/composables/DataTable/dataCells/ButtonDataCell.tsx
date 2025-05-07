import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../../../base';
import type {
  ButtonElementVariant,
  StorageBrowserIconType,
} from '../../../elements';
import { ButtonElement, IconElement } from '../../../elements';

export interface ButtonDataCellProps {
  content: {
    icon?: StorageBrowserIconType;
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
        `${STORAGE_BROWSER_BLOCK}__table-button-data-cell`,
        isIconOnlyButton
          ? `${STORAGE_BROWSER_BLOCK}__table-button-data-cell--icon-only`
          : '',
      ].join(' ')}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      variant={buttonVariant}
    >
      {icon && (
        <IconElement
          className={`${STORAGE_BROWSER_BLOCK}__table-button-data-cell-icon--${icon}`}
          variant={icon}
        />
      )}
      {label}
    </ButtonElement>
  );
};
