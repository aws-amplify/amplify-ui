import React from 'react';

import { ViewElement } from '../elements';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from './constants';

interface EmptyMessageProps {
  children?: React.ReactNode;
}

export const EmptyMessage = ({
  children,
}: EmptyMessageProps): React.JSX.Element => (
  <ViewElement
    className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__empty-message`}
    variant="empty-message"
  >
    {children}
  </ViewElement>
);
