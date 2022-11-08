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
}: TrackerProps): JSX.Element {
  if (!file) return null;

  const { size } = file;

  const icon = hasImage ? <Image alt={file.name} src={url} /> : <IconFile />;

  const showEditButton = (): boolean => {
    // only allow editing of file name if it's error or null
    if (fileState === null || fileState === 'error') {
      return true;
    }
    return false;
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

                {showEditButton() && (
                  <Button onClick={onStartEdit} size="small" variation="link">
                    <EditIcon fontSize="medium" />
                  </Button>
                )}
                <Text as="span" color="font.tertiary" marginInlineStart="small">
                  {humanFileSize(size, true)}
                </Text>
              </Flex>
              <FileState errorMessage={errorMessage} fileState={fileState} />
            </Flex>
            {fileState === 'paused' && (
              <Button onClick={onResume} size="small" variation="link">
                {translate('Resume')}
              </Button>
            )}
            {fileState === 'resume' && (
              <Button onClick={onPause} size="small" variation="link">
                {translate('pause')}
              </Button>
            )}
            {(fileState === null || fileState === 'success') && (
              <Button size="small" onClick={onCancel}>
                <Text>
                  <CloseIcon />
                </Text>
              </Button>
            )}
          </>
        )}
      </Flex>
      <Flex direction="column" gap="0" alignItems="flex-end">
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
