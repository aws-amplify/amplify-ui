import React from 'react';

import { useControl } from '../../context/control';
import { CLASS_BASE } from '../constants';
import { resolveClassName } from '../utils';

import { CreateFolderControls } from './CreateFolderControls';
import { DeleteFileControls } from './DeleteFileControls';
import { UploadControls } from './UploadControls';

export interface LocationActionViewProps {
  className?: (defaultClassName: string) => string;
}
export const LocationActionView = ({
  className,
}: LocationActionViewProps): React.JSX.Element => {
  const [{ selected }] = useControl('LOCATION_ACTIONS');

  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATION_ACTION_VIEW"
    >
      {selected.type === 'CREATE_FOLDER' ? (
        <CreateFolderControls />
      ) : selected.type === 'DELETE_FILE' ? (
        <DeleteFileControls />
      ) : (
        <UploadControls />
      )}
    </div>
  );
};
