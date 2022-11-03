import React from 'react';
import { translate } from '@aws-amplify/ui';
import { humanFileSize } from '@aws-amplify/ui';
import { TrackerProps } from '../types';
import {
  Card,
  Flex,
  View,
  Image,
  Text,
  Button,
  TextField,
  Loader,
} from '../../../../primitives';
import { CloseIcon, EditIcon, fileIcon } from '../Previewer/PreviewerIcons';
import { FileState } from './FileState';
export function Tracker({
  file,
  fileState,
  hasImage,
  isLoading,
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

  const icon = hasImage ? (
    <Image alt="" maxHeight="100%" height="100%" src={url} />
  ) : (
    <View className="amplify-fileuploder__img-placeholder">{fileIcon}</View>
  );

  const showonStartEdit = (): boolean => {
    // if complete or loading can't edit file name
    if (fileState === 'success' || isLoading) return false;
    // only allow editing on error if its a problem with extension
    if (fileState === 'error') {
      return errorMessage === translate('Extension not allowed');
    }
    return true;
  };

  return (
    <Card
      variation="outlined"
      padding="0"
      className="amplify-fileuploader-file"
    >
      <Flex direction="row" padding="xs medium" gap="small" alignItems="center">
        <View className="amplify-fileuploader__img">{icon}</View>
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
            <Flex
              direction="column"
              className="amplify-fileuploader__file-content"
              flex="1"
              gap="0"
            >
              <Flex
                direction="row"
                className="amplify-fileuploader__file-content"
                gap="xxs"
              >
                <Text
                  as="span"
                  fontWeight="bold"
                  className="amplify-fileuploader__filename"
                >
                  {name}
                </Text>

                {showonStartEdit() && (
                  <Button onClick={onStartEdit} size="small" variation="link">
                    <EditIcon fontSize="medium" />
                  </Button>
                )}
                <Text as="span" color="font.tertiary" marginInlineStart="small">
                  {humanFileSize(size, true)}
                </Text>
              </Flex>
              <FileState
                errorMessage={errorMessage}
                fileState={fileState}
                isLoading={isLoading}
              />
            </Flex>
            {isLoading && (
              <>
                {fileState === 'paused' ? (
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
            {!isLoading && (
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
          className="amplify-fileuploader-loader"
          variation="linear"
          percentage={percentage}
          isDeterminate
        />
      </Flex>
    </Card>
  );
}
