import React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { View, Button } from '@aws-amplify/ui-react';
import { StorageManagerDisplayText } from '../../utils';

export interface FileListFooterProps {
  remainingFilesCount: number;
  displayText: StorageManagerDisplayText;
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
