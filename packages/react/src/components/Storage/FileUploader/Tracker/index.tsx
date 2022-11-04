import React from 'react';
import { translate } from '@aws-amplify/ui';
import { humanFileSize } from '@aws-amplify/ui';
import { TrackerProps } from '../types';
import {
  Flex,
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
  hasImage,
  url,
  onChange,
  onPause,
  onResume,
  onCancel,
  isLoading,
  isPaused,
  isSuccess,
  isError,
  errorMessage,
  name,
  percentage,
  isEditing,
  onSaveEdit,
  onStartEdit,
}: TrackerProps): JSX.Element {
  if (!file) return null;

  const { size } = file;

  const icon = hasImage ? <Image alt={file.name} src={url} /> : <IconFile />;

  const showonStartEdit = (): boolean => {
    // if complete or loading can't edit file name
    if (isSuccess || isLoading) return false;
    // only allow editing on error if its a problem with extension
    if (isError) {
      return errorMessage === translate('Extension not allowed');
    }
    return true;
  };

  return (
    <View className={ComponentClassNames.FileUploaderFile}>
      <View className={ComponentClassNames.FileUploaderFileImage}>{icon}</View>
      {isEditing ? (
        <Flex direction="row" flex="1" gap="small" alignItems="center">
          <View flex="1">
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
          </View>
          <Button size="small" variation="primary" onClick={onSaveEdit}>
            Save
          </Button>
        </Flex>
      ) : (
        <>
          <View className={ComponentClassNames.FileUploaderFileMain}>
            <Text className={ComponentClassNames.FileUploaderFileName}>
              {name}
            </Text>
            <FileState
              error={isError}
              errorMessage={errorMessage}
              success={isSuccess && !isError}
              paused={isPaused}
              loading={isLoading}
              percentage={percentage}
            />
          </View>

          {showonStartEdit() && (
            <Button onClick={onStartEdit} size="small" variation="link">
              <IconEdit fontSize="medium" />
            </Button>
          )}

          <Text as="span" className={ComponentClassNames.FileUploaderFileSize}>
            {humanFileSize(size, true)}
          </Text>
          {isLoading && (
            <>
              {isPaused ? (
                <Button onClick={onResume} size="small" variation="link">
                  {translate('Resume')}
                </Button>
              ) : (
                <Button onClick={onPause} size="small" variation="link">
                  {translate('pause')}
                </Button>
              )}
            </>
          )}
          {/* {isSuccess && !isError && (
              <Button size="small" onClick={onDelete}>
                Delete
              </Button>
            )} */}
          {/* {!isSuccess && !isLoading && ( */}
          {!isLoading && (
            <Button size="small" onClick={onCancel}>
              <IconClose />
            </Button>
          )}
        </>
      )}
      {isLoading ? (
        <Loader
          className={ComponentClassNames.FileUploaderLoader}
          variation="linear"
          percentage={percentage}
          isDeterminate
          isPercentageTextHidden
        />
      ) : null}
    </View>
  );
}
