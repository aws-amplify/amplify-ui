import React from 'react';

import { ButtonElement, ViewElement } from '../../context/elements';

import { Controls, NavigateItem } from '../Controls';

import { Title } from './Controls/Title';
import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { SelectedFilesTableControl } from './SelectedFilesTableControl';
import { useCopyActionView } from '../hooks/useCopyActionView';
import { StorageBrowserElements } from '../../context/elements';


export const FIELD_VALIDATION_MESSAGE =
  'Destination folder name must be at least one character and cannot end with a "/".';
export const RESULT_COMPLETE_MESSAGE = 'File copied';
export const RESULT_FAILED_MESSAGE = 'There was an issue copying the files.';


const { Exit, Primary, Table, Cancel } = Controls;
const { actionSelectedText, actionDestination } = displayText;

const { actionCurrentFolderSelected } = displayText;
const { Button } = StorageBrowserElements;

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 10000;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

const DEFAULT_REFRESH_OPTIONS = { ...DEFAULT_LIST_OPTIONS, refresh: true };

interface DestinationPickerColumns {
  name: string;
}

const DESTINATION_PICKER_COLUMNS: Column<DestinationPickerColumns>[] = [
  { key: 'name', header: 'Folder name' },
];


export const CopyFilesControls = (): React.JSX.Element => {
  const { tasks, onClose, onCancel, onStart, destinationList, isProcessing, destination, onSetDestinationList, handleUpdateState } =
    useCopyActionView();

  // const key = selected && selected?.items?.[0].key;
  const disableCancel = false;

  const primaryProps =
  {
    onClick: () => {
      onStart();
    },
    children: 'Copy',
    disabled: isProcessing,
  };

  const handleNavigatePath = (index: number) => {
    const newPath = destinationList.slice(0, index + 1);
    onSetDestinationList(newPath);
  };

  return (
    <>
      <Exit
        onClick={onClose}
      />
      <Title />
      <ViewElement className={`${CLASS_BASE}__copy-destination`}>
        <div className="storage-browser__table" style={{ display: 'flex' }}>
          {actionDestination}
          {destinationList.length ? (
            <>
              {destinationList.map((item, index) => (
                <NavigateItem
                  isCurrent={index === destinationList.length - 1}
                  key={`${item}-${index}`}
                  onClick={() => handleNavigatePath(index)}
                >
                  {item?.replace('/', '')}
                </NavigateItem>
              ))}
            </>
          ) : (
            '-'
          )}
        </div>
      </ViewElement>
      <Primary {...primaryProps} />
      <ButtonElement
        variant="cancel"
        disabled={disableCancel}
        className={`${CLASS_BASE}__cancel`}
        onClick={onCancel}
      >
        Cancel
      </ButtonElement>
      <DestinationPicker
        destinationPrefix={destinationList}
        setDestinationPrefix={onSetDestinationList}
      />
      <SelectedFilesTableControl tasks={tasks} />
    </>
  );
};
