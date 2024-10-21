import React from 'react';

import { CLASS_BASE } from '../constants';
import { resolveClassName } from '../utils';

import { CreateFolderControls } from './CreateFolderControls';
import { UploadControls } from './UploadControls';
import { useStore } from '../../providers/store';

export interface LocationActionViewProps {
  actionType?: string;
  className?: (defaultClassName: string) => string;
  onClose?: () => void;
}

export const LocationActionView = ({
  actionType: _actionType,
  className,
  onClose,
}: LocationActionViewProps): React.JSX.Element | null => {
  const [{ actionType = _actionType }] = useStore();

  if (!actionType) return null;

  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATION_ACTION_VIEW"
    >
      {actionType === 'CREATE_FOLDER' ? (
        <CreateFolderControls onClose={onClose} />
      ) : (
        <UploadControls onClose={onClose} />
      )}
    </div>
  );
};
