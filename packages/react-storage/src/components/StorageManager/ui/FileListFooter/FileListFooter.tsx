import React from 'react';

import { storageManagerClasses } from '@aws-amplify/ui';
import { View, Button } from '@aws-amplify/ui-react';
import { StorageManagerDisplayTextDefault } from '../../utils';

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
    <View className={storageManagerClasses({ _element: 'previewer__footer' })}>
      <View
        className={storageManagerClasses({ _element: 'previewer__actions' })}
      >
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
