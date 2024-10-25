import React from 'react';

import { CLASS_BASE } from '../constants';
import { resolveClassName } from '../utils';

import { CreateFolderControls } from './CreateFolderControls';
import { DeleteFileControls } from './DeleteFileControls';
import { UploadControls } from './UploadControls';
import { useStore } from '../../providers/store';

export interface LocationActionViewProps {
  actionType?: string;
  className?: (defaultClassName: string) => string;
  onClose?: () => void;
}

const ACTION_VIEW_TYPES = ['CREATE_FOLDER', 'UPLOAD_FILES', 'UPLOAD_FOLDER'];

const isActionViewType = (value?: string) =>
  ACTION_VIEW_TYPES.some((type) => type === value);

export const LocationActionView = ({
  actionType: _actionType,
  className,
  onClose,
}: LocationActionViewProps): React.JSX.Element | null => {
  const [{ actionType = _actionType }] = useStore();

  if (!isActionViewType(actionType)) return null;

  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATION_ACTION_VIEW"
    >
      {actionType === 'CREATE_FOLDER' ? (
        <CreateFolderControls onClose={onClose} />
      ) : actionType === 'DELETE_FILES' ? (
        <DeleteFileControls />
      ) : (
        <UploadControls onClose={onClose} />
      )}
    </div>
  );
};
