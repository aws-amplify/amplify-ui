import React from 'react';

import { CLASS_BASE } from '../constants';
import { resolveClassName } from '../utils';

import { CreateFolderControls } from './CreateFolderControls';
import { DeleteFilesControls } from './DeleteFilesControls';
import { UploadControls } from './UploadControls';
import { CopyFilesControls } from './CopyFilesControls';
import { useStore } from '../../providers/store';

export interface LocationActionViewProps<T = string> {
  className?: (defaultClassName: string) => string;
  onExit?: () => void;
  type?: T;
}

const ACTION_VIEW_TYPES = [
  'COPY_FILES',
  'CREATE_FOLDER',
  'DELETE_FILES',
  'UPLOAD_FILES',
  'UPLOAD_FOLDER',
];

const isActionViewType = (value?: string) =>
  ACTION_VIEW_TYPES.some((type) => type === value);

export const LocationActionView = ({
  className,
  onExit,
  type,
}: LocationActionViewProps): React.JSX.Element | null => {
  const [{ actionType = type }] = useStore();

  if (!isActionViewType(actionType)) return null;

  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATION_ACTION_VIEW"
    >
      {actionType === 'CREATE_FOLDER' ? (
        <CreateFolderControls onExit={onExit} />
      ) : actionType === 'DELETE_FILES' ? (
        <DeleteFilesControls onExit={onExit} />
      ) : actionType === 'COPY_FILES' ? (
        <CopyFilesControls onExit={onExit} />
      ) : (
        <UploadControls onExit={onExit} />
      )}
    </div>
  );
};
