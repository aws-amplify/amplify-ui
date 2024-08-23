import * as React from 'react';
import { Button, Image, Text, View } from '@aws-amplify/ui-react';
import { IconClose, useIcons } from '@aws-amplify/ui-react/internal';
import { InputContext } from '../../context';
import { ComponentClassName } from '@aws-amplify/ui';

// TODO remove this after merge main back into this branch
function humanFileSize(bytes: number, si = false, dp = 1): string {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let unit = -1;
  const range = 10 ** dp;

  do {
    bytes /= thresh;
    ++unit;
  } while (
    Math.round(Math.abs(bytes) * range) / range >= thresh &&
    unit < units.length - 1
  );

  return bytes.toFixed(dp) + ' ' + units[unit];
}

const Attachment = ({
  file,
  handleRemove,
}: React.PropsWithoutRef<{ file: File; handleRemove: () => void }>) => {
  const icons = useIcons('aiConversation');
  const removeIcon = icons?.remove ?? <IconClose />;
  return (
    <View className={ComponentClassName.AIConversationAttachment}>
      <Image
        className={ComponentClassName.AIConversationAttachmentImage}
        src={URL.createObjectURL(file)}
        alt={file.name}
      />
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
  setInput: InputContext['setInput'];
}): JSX.Element | null => {
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
