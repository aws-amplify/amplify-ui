import React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { View, Button } from '@aws-amplify/ui-react';
import type { FileUploaderDisplayTextDefault } from '../../utils';

export interface FileListFooterProps {
  remainingFilesCount: number;
  displayText: FileUploaderDisplayTextDefault;
  onClearAll: () => void;
  onUploadAll: () => void;
}

export function FileListFooter({
  displayText,
  remainingFilesCount,
  onClearAll,
  onUploadAll,
}: FileListFooterProps): React.JSX.Element {
  const { clearAllButtonText, getUploadButtonText } = displayText;
  return (
    <View className={ComponentClassName.FileUploaderPreviewerFooter}>
      <View className={ComponentClassName.FileUploaderPreviewerActions}>
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
