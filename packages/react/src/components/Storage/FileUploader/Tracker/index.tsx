import React from 'react';
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
} from '../../../../primitives';
import {
  IconClose,
  IconEdit,
  IconFile,
} from '../../../../primitives/Icon/internal';
import { FileState } from './FileState';

export function Tracker({
  file,
  fileState,
  hasImage,
  url,
  onChange,
  onPause,
  onResume,
  onCancel,
  errorMessage,
  name,
  percentage,
  isEditing,
  onSaveEdit,
  onStartEdit,
  resumable,
}: TrackerProps): JSX.Element {
  if (!file) return null;

  const { size } = file;

  const icon = hasImage ? <Image alt={file.name} src={url} /> : <IconFile />;

  const showEditButton = fileState === null || fileState === 'error';

  const DisplayView = () => (
    <>
      <View className={ComponentClassNames.FileUploaderFileMain}>
        <Text className={ComponentClassNames.FileUploaderFileName}>{name}</Text>
        <FileState
          fileState={fileState}
          errorMessage={errorMessage}
          percentage={percentage}
        />
      </View>
      <Text as="span" className={ComponentClassNames.FileUploaderFileSize}>
        {humanFileSize(size, true)}
      </Text>
    </>
  );

  const Actions = () => {
    switch (fileState) {
      case 'editing':
        return (
          <Button size="small" variation="primary" onClick={onSaveEdit}>
            Save
          </Button>
        );
      case 'loading':
        if (!resumable) return null;
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
                <IconEdit fontSize="medium" />
              </Button>
            ) : null}
            <Button size="small" onClick={onCancel}>
              <IconClose />
            </Button>
          </>
        );
    }
  };

  const isDeterminate = !resumable || (resumable && percentage > 0);

  return (
    <View className={ComponentClassNames.FileUploaderFile}>
      <View className={ComponentClassNames.FileUploaderFileImage}>{icon}</View>

      {/* Main View */}
      {isEditing ? (
        <TextField
          maxLength={1024}
          width="100%"
          label="file name"
          size="small"
          variation="quiet"
          labelHidden
          onChange={onChange}
          value={name}
        />
      ) : (
        <DisplayView />
      )}

      {/* Actions */}
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
