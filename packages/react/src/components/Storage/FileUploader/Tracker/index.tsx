import React from 'react';
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
} from '../../../../primitives';
import { CloseIcon, EditIcon, fileIcon } from '../Previewer/PreviewerIcons';

export function Tracker({
  file,
  hasImage,
  url,
  onChange,
  onCancel,
  name,
}: TrackerProps): JSX.Element {
  const [isEditing, setIsEditing] = React.useState(false);
  if (!file) return null;

  const { size } = file;

  let icon = (
    <View className="amplify-fileuploder--img-placeholder">{fileIcon}</View>
  );

  if (hasImage) {
    icon = <Image alt="" maxHeight="100%" height="100%" src={url} />;
  }

  return (
    <Card
      variation="outlined"
      padding="0"
      className="amplify-fileuploader-file"
    >
      <Flex direction="row" padding="xs medium" gap="small" alignItems="center">
        <View className="amplify-fileuploader-img">{icon}</View>
        {isEditing ? (
          <Flex direction="row" flex="1" gap="small" alignItems="center">
            <View flex="1">
              <TextField
                width="100%"
                label="file name"
                size="small"
                variation="quiet"
                labelHidden
                onChange={onChange}
                value={name}
              />
            </View>
            <Button
              size="small"
              variation="primary"
              onClick={() => setIsEditing(false)}
            >
              Save
            </Button>
            <Button
              size="small"
              variation="link"
              onClick={() => setIsEditing(false)}
            >
              Cancel
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
                <Button
                  onClick={() => setIsEditing(true)}
                  size="small"
                  variation="link"
                >
                  <EditIcon fontSize="medium" />
                </Button>
                <Text as="span" color="font.tertiary" marginInlineStart="small">
                  {humanFileSize(size, true)}
                </Text>
              </Flex>
              {/**TODO: file state */}
            </Flex>
            <Button size="small" onClick={onCancel}>
              <Text>
                <CloseIcon />
              </Text>
            </Button>
          </>
        )}
      </Flex>
    </Card>
  );
}
