import * as React from 'react';
import { Button, Image, Text, View } from '@aws-amplify/ui-react';
import {
  IconClose,
  IconDocument,
  useIcons,
} from '@aws-amplify/ui-react/internal';
import type { ConversationInputContextProps } from '../../context';
import { ComponentClassName, humanFileSize } from '@aws-amplify/ui';
import { documentFileTypes, getAttachmentFormat } from '../../utils';

const Attachment = ({
  file,
  handleRemove,
}: React.PropsWithoutRef<{ file: File; handleRemove: () => void }>) => {
  const icons = useIcons('aiConversation');
  const removeIcon = icons?.remove ?? <IconClose />;
  const fileIcon = icons?.document ?? <IconDocument />;
  const format = getAttachmentFormat(file);
  const isDocument = documentFileTypes.has(format);
  return (
    <View className={ComponentClassName.AIConversationAttachment}>
      {isDocument ? (
        fileIcon
      ) : (
        <Image
          className={ComponentClassName.AIConversationAttachmentImage}
          src={URL.createObjectURL(file)}
          alt={file.name}
        />
      )}
      <Text
        as="span"
        className={ComponentClassName.AIConversationAttachmentName}
      >
        {file.name}
      </Text>
      <Text
        as="span"
        className={ComponentClassName.AIConversationAttachmentSize}
      >
        {humanFileSize(file.size, true)}
      </Text>
      <Button
        size="small"
        variation="link"
        colorTheme="error"
        className={ComponentClassName.AIConversationAttachmentRemove}
        onClick={handleRemove}
      >
        {removeIcon}
      </Button>
    </View>
  );
};

export const Attachments = ({
  files,
  setInput,
}: {
  files?: File[];
  setInput: ConversationInputContextProps['setInput'];
}): React.JSX.Element | null => {
  if (!files || files.length < 1) {
    return null;
  }
  return (
    <View className={ComponentClassName.AIConversationAttachmentList}>
      {files?.map((file, i) => {
        return (
          <Attachment
            key={file.name}
            file={file}
            handleRemove={() => {
              setInput?.((prevInput) => ({
                ...prevInput,
                files: prevInput?.files?.filter((_, j) => i !== j),
              }));
            }}
          />
        );
      })}
    </View>
  );
};
