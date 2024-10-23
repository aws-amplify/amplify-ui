import React from 'react';

import { ViewElement } from '../context/elements';
import { CLASS_BASE } from '../views/constants';

interface EmptyMessageProps {
  children?: React.ReactNode;
}

export const EmptyMessage = ({
  children,
}: EmptyMessageProps): React.JSX.Element => (
  <ViewElement
    className={`${CLASS_BASE}__empty-message`}
    variant="empty-message"
  >
    {children}
  </ViewElement>
);
