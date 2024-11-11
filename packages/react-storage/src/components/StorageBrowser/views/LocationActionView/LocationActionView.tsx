import React from 'react';

import { CreateFolderView } from './CreateFolderView';
import { CopyView } from './CopyView';
import { DeleteView } from './DeleteView';
import { UploadView } from './UploadView';
import { useStore } from '../../providers/store';

export interface LocationActionViewProps<T = string> {
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
  onExit,
  type,
}: LocationActionViewProps): React.JSX.Element | null => {
  const [{ actionType = type }] = useStore();

  if (!isActionViewType(actionType)) return null;

  return (
    <>
      {actionType === 'CREATE_FOLDER' ? (
        <CreateFolderView onExit={onExit} />
      ) : actionType === 'DELETE_FILES' ? (
        <DeleteView onExit={onExit} />
      ) : actionType === 'COPY_FILES' ? (
        <CopyView onExit={onExit} />
      ) : (
        <UploadView onExit={onExit} />
      )}
    </>
  );
};
