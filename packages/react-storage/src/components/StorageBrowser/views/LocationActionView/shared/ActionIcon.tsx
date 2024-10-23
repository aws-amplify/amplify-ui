import React from 'react';

import { IconVariant, StorageBrowserElements } from '../../../context/elements';
import { CLASS_BASE } from '../../constants';
import { TaskStatus } from '../../../tasks';

interface ActionIconProps {
  status?: TaskStatus | 'CANCELED';
}

const { Icon } = StorageBrowserElements;

export const ICON_CLASS = `${CLASS_BASE}__action-status`;

export const ActionIcon = ({ status }: ActionIconProps): React.JSX.Element => {
  let variant: IconVariant = 'action-initial';

  switch (status) {
    case 'QUEUED':
      variant = 'action-queued';
      break;
    case 'PENDING':
      variant = 'action-progress';
      break;
    case 'COMPLETE':
      variant = 'action-success';
      break;
    case 'FAILED':
      variant = 'action-error';
      break;
    case 'CANCELED':
      variant = 'action-canceled';
      break;
  }

  return (
    <Icon
      variant={variant}
      className={`${ICON_CLASS} ${ICON_CLASS}--${variant}${
        variant === 'action-progress' ? ' storage-browser__loading__icon' : ''
      }`}
    />
  );
};
