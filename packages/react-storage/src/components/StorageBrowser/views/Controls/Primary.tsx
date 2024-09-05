import React from 'react';

import { CLASS_BASE } from '../constants';
import { ButtonElement } from '../../context/elements/definitions';

const BLOCK_NAME = `${CLASS_BASE}__primary`;
interface PrimaryControlProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const PrimaryControl = ({
  onClick,
  disabled,
  children,
}: PrimaryControlProps): React.JSX.Element => (
  <ButtonElement
    variant="primary"
    className={BLOCK_NAME}
    onClick={onClick}
    disabled={disabled}
  >
    {children ?? 'Start'}
  </ButtonElement>
);
