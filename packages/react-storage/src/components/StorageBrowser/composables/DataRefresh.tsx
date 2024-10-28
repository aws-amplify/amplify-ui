import React from 'react';

import { ButtonElement } from '../context/elements/definitions';
import { IconElement } from '../context/elements/IconElement';
import { CLASS_BASE } from '../views/constants';

export interface DataRefreshProps {
  onRefresh?: () => void;
  isDisabled?: boolean;
}

export const DataRefresh = ({
  onRefresh,
  isDisabled = false,
}: DataRefreshProps): React.JSX.Element => (
  <ButtonElement
    className={`${CLASS_BASE}__refresh`}
    aria-label="Refresh data"
    variant="refresh"
    onClick={onRefresh}
    disabled={isDisabled}
  >
    <IconElement className={`${CLASS_BASE}__refresh-icon`} variant="refresh" />
  </ButtonElement>
);
