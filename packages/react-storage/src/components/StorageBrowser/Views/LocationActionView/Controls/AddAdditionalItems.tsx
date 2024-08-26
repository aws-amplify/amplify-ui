import React from 'react';

import { useFileSelect } from '@aws-amplify/ui-react/internal';

import { StorageBrowserElements } from '../../../context/elements';
import { CLASS_BASE } from '../../constants';
import { useControl } from '../../../context/controls';
import { LocationItem } from '../../../context/types';

const { Button } = StorageBrowserElements;

const BLOCK_NAME_ADD_FILES = `${CLASS_BASE}__add-files`;
const BLOCK_NAME_ADD_FOLDER = `${CLASS_BASE}__add-folder`;

export interface AddFilesControl {
  (props: { disabled: boolean }): React.JSX.Element;
}

export interface AddFolderControl {
  (props: { disabled: boolean }): React.JSX.Element;
}

function getItemsToAdd({
  items,
  files,
}: {
  items: LocationItem[];
  files: File[];
}) {
  const locationItemsMap = new Map<string, LocationItem>();
  items.forEach((item) => {
    // If we have previously selected items, use them to create our map of unique items
    const { key } = item;
    locationItemsMap.set(key, item);
  });

  for (const data of files) {
    const { name, lastModified, size, webkitRelativePath } = data;

    locationItemsMap.set(name, {
      key: webkitRelativePath?.length > 0 ? webkitRelativePath : name,
      data,
      lastModified: new Date(lastModified),
      size,
      type: 'FILE',
    });
  }

  return Array.from(locationItemsMap.values());
}

export const AddFilesControl: AddFilesControl = ({ disabled }) => {
  const [{ selected }, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });

  const { items: prevSelectedItems } = selected;
  const items = prevSelectedItems ?? [];

  const handleInputChange = (files: File[]) => {
    const itemsToAdd = getItemsToAdd({ items, files });

    handleUpdateState({
      type: 'ADD_ITEMS',
      items: itemsToAdd,
    });
  };

  const [fileSelect, handleSelect] = useFileSelect(handleInputChange);

  return (
    <>
      {fileSelect}
      <Button
        variant="add-files"
        className={BLOCK_NAME_ADD_FILES}
        disabled={disabled}
        onClick={() => {
          handleSelect('file');
        }}
      >
        Add Files
      </Button>
    </>
  );
};

export const AddFolderControl: AddFolderControl = ({ disabled }) => {
  const [{ selected }, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });

  const { items: prevSelectedItems } = selected;
  const items = prevSelectedItems ?? [];

  const handleInputChange = (files: File[]) => {
    const itemsToAdd = getItemsToAdd({ items, files });

    handleUpdateState({
      type: 'ADD_ITEMS',
      items: itemsToAdd,
    });
  };

  const [fileSelect, handleSelect] = useFileSelect(handleInputChange);

  return (
    <>
      {fileSelect}
      <Button
        variant="add-folder"
        className={BLOCK_NAME_ADD_FOLDER}
        disabled={disabled}
        onClick={() => {
          handleSelect('folder');
        }}
      >
        Add Folder
      </Button>
    </>
  );
};
