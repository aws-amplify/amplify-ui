import React from 'react';

import { useControl } from '../../context/control';
import { CLASS_BASE } from '../constants';
import { resolveClassName } from '../utils';

import { CreateFolderControls } from './CreateFolderControls';
import { UploadControls } from './UploadControls';
import { CopyFilesControls } from './CopyFilesControls';

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
      ) : selected.type === 'COPY_FILES' ? (
        <CopyFilesControls />
      ) : (
        <UploadControls />
      )}
    </div>
  );
};
