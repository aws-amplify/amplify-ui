import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';
import { FileInput } from './FileInput';

const { Button } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__add-files`;

export interface AddFilesControl {
  (props: { disable: boolean }): React.JSX.Element;
}

export const AddFilesControl: AddFilesControl = ({ disable }) => {
  const fileUploadRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <FileInput
        actionType="UPLOAD_FILES"
        actionName="Upload Files"
        ref={fileUploadRef}
      />
      <Button
        className={BLOCK_NAME}
        disabled={disable}
        onClick={() => {
          if (fileUploadRef?.current) {
            fileUploadRef.current.click();
          }
        }}
      >
        Add Files
      </Button>
    </>
  );
};
