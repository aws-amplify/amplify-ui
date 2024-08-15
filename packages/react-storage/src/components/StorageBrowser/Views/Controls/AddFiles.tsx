import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';

const { Button: ButtonElement } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__add-files`;

export interface _AddFilesControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
}

export interface AddFilesControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_AddFilesControl<T>, 'Button'> {
  (): React.JSX.Element;
}

const Button = withBaseElementProps(ButtonElement, {
  className: `${BLOCK_NAME}`,
  variant: 'primary',
});

export const AddFilesControl: AddFilesControl = () => {
  const [{ history }] = useControl({ type: 'NAVIGATE' });
  const [{ selected }, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });

  const { items: prevSelectedItems } = selected;

  const fileUploadRef = React.useRef<HTMLInputElement>(null);

  const destination = history[history.length - 1];

  const handleInputChange = () => {
    if (fileUploadRef.current?.files) {
      const files: FileList = fileUploadRef.current?.files;
      const items = prevSelectedItems ? [...prevSelectedItems] : [];
      for (const data of files) {
        const { name, lastModified, size } = data;

        // if same file name is already in the list, replace it
        if (prevSelectedItems?.find((item) => item.key === name)) {
          const index = items.findIndex((item) => item.key === name);
          items.splice(index, 1);
        }

        items.push({
          key: name,
          data,
          lastModified: new Date(lastModified),
          size,
          type: 'FILE',
        });
      }

      handleUpdateState({
        actionType: 'UPLOAD_FILES',
        type: 'SELECT_ACTION_TYPE',
        destination,
        items,
        name: 'Upload Files',
      });
    }
  };

  return (
    <>
      <input
        ref={fileUploadRef}
        style={{ display: 'none' }}
        type="file"
        onChange={() => handleInputChange()}
        multiple
      />
      <Button
        className={BLOCK_NAME}
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
