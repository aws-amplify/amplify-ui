import React from 'react';

import { ButtonElement } from '../context/elements/definitions';
import { IconElement } from '../context/elements/IconElement';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../constants';

export interface DataRefreshProps {
  onRefresh?: () => void;
  isDisabled?: boolean;
}

export const DataRefresh = ({
  onRefresh,
  isDisabled = false,
}: DataRefreshProps): React.JSX.Element => (
  <ButtonElement
    className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__data-refresh`}
    aria-label="Refresh data"
    variant="refresh"
    onClick={onRefresh}
    disabled={isDisabled}
  >
    <IconElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__data-refresh-icon`}
      variant="refresh"
    />
  </ButtonElement>
);
