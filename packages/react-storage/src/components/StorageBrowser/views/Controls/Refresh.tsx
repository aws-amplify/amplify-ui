import React from 'react';

import { ButtonElement } from '../../context/elements/definitions';
import { IconElement } from '../../context/elements/IconElement';
import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__refresh`;

interface RefreshControlProps {
  onClick?: () => void;
  disabled?: boolean;
}
export const RefreshControl = ({
  onClick,
  disabled = false,
}: RefreshControlProps): React.JSX.Element => (
  <ButtonElement
    className={BLOCK_NAME}
    aria-label="Refresh table"
    variant="refresh"
    onClick={onClick}
    disabled={disabled}
  >
    <IconElement className={`${BLOCK_NAME}__icon`} variant="refresh" />
  </ButtonElement>
);
