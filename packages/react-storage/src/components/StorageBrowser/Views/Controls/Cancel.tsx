import React from 'react';

import { CLASS_BASE } from '../constants';
import { ButtonElement } from '../../context/elements/definitions';
import { IconElement } from '../../context/elements/IconElement';

const BLOCK_NAME = `${CLASS_BASE}__cancel`;

interface CancelControlProps {
  onClick?: () => void;
  ariaLabel?: string;
}

export const CancelControl = ({
  onClick,
  ariaLabel,
}: CancelControlProps): React.JSX.Element => (
  <ButtonElement
    className={`${BLOCK_NAME}`}
    onClick={onClick}
    aria-label={ariaLabel}
    variant="cancel"
  >
    <IconElement className={`${BLOCK_NAME}__icon`} variant="cancel" />
  </ButtonElement>
);
