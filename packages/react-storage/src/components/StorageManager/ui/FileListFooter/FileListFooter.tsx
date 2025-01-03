import React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { View, Button } from '@aws-amplify/ui-react';
import { FileUploaderDisplayTextDefault as StorageManagerDisplayTextDefault } from '../../../FileUploader/utils';

export interface FileListFooterProps {
  remainingFilesCount: number;
  displayText: StorageManagerDisplayTextDefault;
  onClearAll: () => void;
  onUploadAll: () => void;
}

export function FileListFooter({
  displayText,
  remainingFilesCount,
  onClearAll,
  onUploadAll,
}: FileListFooterProps): JSX.Element {
  const { clearAllButtonText, getUploadButtonText } = displayText;
  return (
    <View className={ComponentClassName.StorageManagerPreviewerFooter}>
      <View className={ComponentClassName.StorageManagerPreviewerActions}>
        <Button size="small" variation="link" onClick={onClearAll}>
          {clearAllButtonText}
        </Button>
        <Button size="small" variation="primary" onClick={onUploadAll}>
          {getUploadButtonText(remainingFilesCount)}
        </Button>
      </View>
    </View>
  );
}
