import React from 'react';

import { useFileSelect } from '@aws-amplify/ui-react/internal';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import { LocationItem } from '../../context/types';

const { Button } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__add-files`;

export interface AddFilesControl {
  (props: { disable: boolean }): React.JSX.Element;
}

function getItemsToAdd(items: LocationItem[], files: File[]) {
  const locationItemsMap = new Map<string, LocationItem>();
  items.forEach((item) => {
    // If we have previously selected items, use them to create our map of unique items
    const { key } = item;
    locationItemsMap.set(key, item);
  });

  for (const data of files) {
    const { name, lastModified, size } = data;

    locationItemsMap.set(name, {
      key: name,
      data,
      lastModified: new Date(lastModified),
      size,
      type: 'FILE',
    });
  }

  return locationItemsMap;
}

export const AddFilesControl: AddFilesControl = ({ disable }) => {
  // const [files, setFiles] = React.useState<File[]>([]);
  const [{ selected }, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });

  const { items: prevSelectedItems } = selected;
  const items = prevSelectedItems ?? [];

  const handleInputChange = (files: File[]) => {
    const locationItemsMap = getItemsToAdd(items, files);

    handleUpdateState({
      type: 'ADD_ITEMS',
      items: Array.from(locationItemsMap.values()),
    });
  };

  const [fileSelect, handleSelect] = useFileSelect(handleInputChange);

  return (
    <>
      {fileSelect}
      <Button
        variant="add-files"
        className={BLOCK_NAME}
        disabled={disable}
        onClick={() => {
          handleSelect('file');
        }}
      >
        Add Files
      </Button>
    </>
  );
};
