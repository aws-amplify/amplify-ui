import React from 'react';

import { ButtonElement } from '../context/elements/definitions';
import { IconElement } from '../context/elements/IconElement';
import { CLASS_BASE } from '../views/constants';

  onRefresh?: () => void;
  isDisabled?: boolean;

export const DataRefresh = ({
  onClick,
  disabled = false,
}: DataRefreshProps): React.JSX.Element => (
  <ButtonElement
    className={`${CLASS_BASE}__refresh`}
    aria-label="Refresh data"
    variant="refresh"
    onClick={onClick}
    disabled={disabled}
  >
    <IconElement className={`${CLASS_BASE}__refresh-icon`} variant="refresh" />
  </ButtonElement>
);
