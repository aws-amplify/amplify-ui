import React from 'react';

import { ViewElement } from '../../context/elements/definitions';
import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__empty-message`;

interface EmptyMessageControlProps {
  children?: React.ReactNode;
}

export const EmptyMessageControl = ({
  children,
}: EmptyMessageControlProps): React.JSX.Element => (
  <ViewElement className={BLOCK_NAME} variant="empty-message">
    {children}
  </ViewElement>
);
