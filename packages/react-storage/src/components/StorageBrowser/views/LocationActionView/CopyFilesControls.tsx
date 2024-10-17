import React, { useState } from 'react';

import { useControl } from '../../context/control';
import { ButtonElement, ViewElement } from '../../context/elements';

import { Controls, NavigateItem } from '../Controls';

import { Title } from './Controls/Title';
import { copyHandler, LocationData } from '../../actions/handlers';
import { useGetLocationConfig } from '../../context/config';
import { parseLocationAccess } from '../../context/navigate/utils';
import { DescriptionList } from '../../components/DescriptionList';
import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { SelectedFilesTableControl } from './SelectedFilesTableControl';

const { actionSelectedText, actionDestination } = displayText;

const { Exit, Primary, Table, Cancel } = Controls;

const useCopyView = ({ prefix }: { prefix: string }) => {
  const [destinationPrefix, setDestinationPrefix] = useState([prefix]);
  return {
    destinationPrefix,
    setDestinationPrefix,
    fullDestinationPrefix: destinationPrefix.join(''),
  };
};

// onCancel would cancel unstarted tasks

export const isValidDestinationPath = (name: string | undefined): boolean =>
  !!name?.length && !name.endsWith('/');

export const FIELD_VALIDATION_MESSAGE =
  'Destination folder name must be at least one character and cannot end with a "/".';
export const RESULT_COMPLETE_MESSAGE = 'File copied';
export const RESULT_FAILED_MESSAGE = 'There was an issue copying the files.';

export const CopyFilesControls = (): React.JSX.Element => {
  const [, handleUpdateState] = useControl('LOCATION_ACTIONS');
  const [status, setStatus] = useState('');

  const getConfig = useGetLocationConfig();
  const { bucket, credentialsProvider, region } = getConfig();

  const [{ location, path }] = useControl('NAVIGATE');
  const { prefix: rootPrefix } = location
    ? parseLocationAccess(location)
    : ({} as LocationData);
  const { destinationPrefix, setDestinationPrefix, fullDestinationPrefix } =
    useCopyView({ prefix: rootPrefix });

  const [{ selected }] = useControl('LOCATION_ACTIONS');
  const key = selected && selected?.items?.[0].key;
  const disableCancel = false;

  const handleCopyFiles = async () => {
    if (destinationPrefix && key) {
      const { result } = copyHandler({
        prefix: path ?? '',
        data: { destinationPrefix: fullDestinationPrefix, key },
        key,
        config: {
          accountId: '',
          bucket,
          credentials: credentialsProvider,
          region,
        },
      });
      const status = await result;
      setStatus(status);
    }
  };

  const handleClose = () => {
    handleUpdateState({ type: 'CLEAR' });
  };

  const primaryProps =
    status === 'COMPLETE'
      ? {
        isDisabled: true,
        children: 'Copy',
      }
      : {
        onClick: () => {
          handleCopyFiles();
        },
        children: 'Copy',
        disabled: !destinationPrefix,
      };

  const handleNavigatePath = (index: number) => {
    const newPath = destinationPrefix.slice(0, index + 1);
    setDestinationPrefix(newPath);
  };

  return (
    <>
      <Exit
        onClick={() => {
          handleClose();
        }}
      />
      <Title />
      <ViewElement className={`${CLASS_BASE}__copy-destination`}>
        <div className="storage-browser__table" style={{ display: 'flex' }}>
          {actionDestination}
          {destinationPrefix.length ? (
            <>
              {destinationPrefix.map((item, index) => (
                <NavigateItem
                  isCurrent={index === destinationPrefix.length - 1}
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
        onClick={() => {
          // handleCancel();
          console.log('cancel');
        }}
      >
        Cancel
      </ButtonElement>
      <DestinationPicker
        destinationPrefix={destinationPrefix}
        setDestinationPrefix={setDestinationPrefix}
      />
      {selected.items ? (
        <SelectedFilesTableControl items={selected.items} />
      ) : null}
    </>
  );
};
