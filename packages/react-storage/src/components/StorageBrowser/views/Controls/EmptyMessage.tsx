import React from 'react';

import { ViewElement } from '../../context/elements/definitions';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../constants';

interface EmptyMessageControlProps {
  children?: React.ReactNode;
}

export const EmptyMessageControl = ({
  children,
}: EmptyMessageControlProps): React.JSX.Element => (
  <ViewElement
    className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__empty-message`}
    variant="empty-message"
  >
    {children}
  </ViewElement>
);
