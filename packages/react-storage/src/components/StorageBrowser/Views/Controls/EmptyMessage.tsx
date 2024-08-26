import React from 'react';

import { ViewElement } from '../../context/elements/definitions';
import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__empty-message`;

export const EmptyMessageControl = (): React.JSX.Element => (
  <ViewElement className={BLOCK_NAME} variant="empty-message">
    No items to show.
  </ViewElement>
);
