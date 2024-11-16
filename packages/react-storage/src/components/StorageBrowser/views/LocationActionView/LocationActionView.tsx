import React from 'react';

import { isDefaultActionViewType } from '../../actions';
import { useStore } from '../../providers/store';

import { CreateFolderView } from './CreateFolderView';
import { CopyView } from './CopyView';
import { DeleteView } from './DeleteView';
import { UploadView } from './UploadView';

export interface LocationActionViewProps<T = string> {
  onExit?: () => void;
  type?: T;
}

export const LocationActionView = ({
  type,
  ...props
}: LocationActionViewProps): React.JSX.Element | null => {
  const [{ actionType = type }] = useStore();

  if (!isDefaultActionViewType(actionType)) return null;

  return (
    <>
      {actionType === 'createFolder' ? (
        <CreateFolderView {...props} />
      ) : actionType === 'delete' ? (
        <DeleteView {...props} />
      ) : actionType === 'copy' ? (
        <CopyView {...props} />
      ) : (
        <UploadView {...props} />
      )}
    </>
  );
};
