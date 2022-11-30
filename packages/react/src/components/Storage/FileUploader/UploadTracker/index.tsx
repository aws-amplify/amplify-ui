import React, { useCallback } from 'react';
import { translate } from '@aws-amplify/ui';
import { humanFileSize } from '@aws-amplify/ui';
import { TrackerProps } from '../types';
import {
  View,
  Image,
  Text,
  Button,
  TextField,
  Loader,
  ComponentClassNames,
  VisuallyHidden,
} from '../../../../primitives';
import {
  IconClose,
  IconEdit,
  IconFile,
} from '../../../../primitives/Icon/internal';
import { UploadMessage } from './UploadMessage';

export function UploadTracker({
  errorMessage,
  file,
  fileState,
  hasImage,
  name,
  onCancel,
  onCancelEdit,
  onPause,
  onResume,
  onSaveEdit,
  onStartEdit,
  percentage,
  isResumable,
  showImage,
}: TrackerProps): JSX.Element {
  const [tempName, setTempName] = React.useState(name);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const url = URL.createObjectURL(file);

  // Focus the input after pressing the edit button
  React.useEffect(() => {
    if (fileState === 'editing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [fileState]);

  const { size } = file;

  const icon = hasImage ? <Image alt={file.name} src={url} /> : <IconFile />;
  const isDeterminate = isResumable ? percentage > 0 : true;

  const showEditButton =
    fileState === null ||
    (fileState === 'error' &&
      errorMessage === translate('Extension not allowed'));

  const DisplayView = useCallback(
    () => (
      <>
        <View className={ComponentClassNames.FileUploaderFileMain}>
          <Text className={ComponentClassNames.FileUploaderFileName}>
            {name}
          </Text>
          <UploadMessage
            fileState={fileState}
            errorMessage={errorMessage}
            percentage={percentage}
          />
        </View>
        <Text as="span" className={ComponentClassNames.FileUploaderFileSize}>
          {humanFileSize(size, true)}
        </Text>
      </>
    ),
    [errorMessage, fileState, name, percentage, size]
  );

  const Actions = useCallback(() => {
    switch (fileState) {
      case 'editing':
        return (
          <>
            <Button
              size="small"
              variation="primary"
              onClick={() => {
                onSaveEdit(tempName);
              }}
            >
              Save
            </Button>
            <Button
              size="small"
              onClick={() => {
                setTempName(name);
                onCancelEdit();
              }}
            >
              Cancel
            </Button>
          </>
        );
      case 'resume':
      case 'loading':
        if (!isResumable) return null;
        return (
          <Button onClick={onPause} size="small" variation="link">
            {translate('pause')}
          </Button>
        );
      case 'paused':
        return (
          <Button onClick={onResume} size="small" variation="link">
            {translate('Resume')}
          </Button>
        );
      case 'success':
        return null;
      default:
        return (
          <>
            {showEditButton ? (
              <Button onClick={onStartEdit} size="small" variation="link">
                <VisuallyHidden>Edit file name {file.name}</VisuallyHidden>
                <IconEdit aria-hidden fontSize="medium" />
              </Button>
            ) : null}
            <Button size="small" onClick={onCancel}>
              <VisuallyHidden>Remove file name {file.name}</VisuallyHidden>
              <IconClose aria-hidden fontSize="medium" />
            </Button>
          </>
        );
    }
  }, [
    file.name,
    fileState,
    isResumable,
    name,
    onCancel,
    onCancelEdit,
    onPause,
    onResume,
    onSaveEdit,
    onStartEdit,
    showEditButton,
    tempName,
  ]);

  if (!file) return null;

  return (
    <View className={ComponentClassNames.FileUploaderFile}>
      {showImage ? (
        <View className={ComponentClassNames.FileUploaderFileImage}>
          {icon}
        </View>
      ) : null}

      {/* Main View */}
      {fileState === 'editing' ? (
        // Wrapping this text field in a form with onSubmit will allow keyboard
        // users to press enter to save changes.
        <View
          as="form"
          flex="1"
          onSubmit={() => {
            onSaveEdit(tempName);
          }}
        >
          <TextField
            maxLength={1024}
            ref={inputRef}
            label="file name"
            size="small"
            variation="quiet"
            labelHidden
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTempName(e.target.value);
            }}
            value={tempName}
          />
        </View>
      ) : (
        <DisplayView />
      )}

      <Actions />

      {fileState === 'loading' ? (
        <Loader
          className={ComponentClassNames.FileUploaderLoader}
          variation="linear"
          percentage={percentage}
          isDeterminate={isDeterminate}
          isPercentageTextHidden
        />
      ) : null}
    </View>
  );
}
