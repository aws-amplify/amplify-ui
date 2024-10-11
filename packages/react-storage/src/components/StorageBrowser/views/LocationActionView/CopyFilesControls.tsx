import React, { useState } from 'react';

import { Field } from '../../components/Field';
import { useControl } from '../../context/control';
import { SpanElement, ViewElement } from '../../context/elements';

import { Controls } from '../Controls';

import { Title } from './Controls/Title';
import { copyHandler, LocationData } from '../../actions/handlers';
import { useGetLocationConfig } from '../../context/config';
import { parseLocationAccess } from '../../context/navigate/utils';
import { DescriptionList } from '../../components/DescriptionList';
import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';

const { Exit, Primary } = Controls;

// const useCopyView = ()=> {

// }
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
  const [destinationPrefix, setDestinationPrefix] = React.useState(rootPrefix);

  const [{ selected }] = useControl('LOCATION_ACTIONS');
  const key = selected && selected?.items?.[0].key;
  const [fieldValidationError, setFieldValidationError] = React.useState<
    string | undefined
  >();

  const handleBlur = () => {
    if (!isValidDestinationPath(destinationPrefix)) {
      setFieldValidationError(FIELD_VALIDATION_MESSAGE);
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    // // validate on change if validation error is present
    if (fieldValidationError && isValidDestinationPath(target.value)) {
      setFieldValidationError(undefined);
    }
    if (target.value) {
      setDestinationPrefix(`${rootPrefix}${target.value}`);
    } else {
      setDestinationPrefix(rootPrefix);
    }
  };

  const handleCopyFiles = async () => {
    if (destinationPrefix && key) {
      const { result } = copyHandler({
        prefix: path ?? '',
        data: { destinationPrefix, key },
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

  return (
    <>
      <Exit
        onClick={() => {
          handleClose();
        }}
      />
      <Title />
      <ViewElement className={`${CLASS_BASE}__copy-destination`}>
        <DescriptionList
          descriptions={[
            {
              term: `${displayText.actionDestination}:`,
              details: destinationPrefix,
            },
          ]}
        />
      </ViewElement>
      <Primary {...primaryProps} />
      <Field
        label="Enter destination:"
        // disabled={isLoading || !!result?.status}
        aria-invalid={fieldValidationError ? 'true' : undefined}
        aria-describedby="fieldError"
        type="text"
        id="folder-name-input"
        onBlur={handleBlur}
        onChange={handleChange}
      >
        {fieldValidationError ? (
          <SpanElement id={'fieldError'} variant="field-error">
            {fieldValidationError}
          </SpanElement>
        ) : null}
      </Field>
      {selected.items?.map(({ key }) => {
        return <em key={key}>{key}</em>;
      })}
    </>
  );
};
