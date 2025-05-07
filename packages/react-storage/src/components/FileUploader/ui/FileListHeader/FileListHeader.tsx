import React from 'react';
import type { FileUploaderDisplayTextDefault } from '../../utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { Text } from '@aws-amplify/ui-react';

export interface FileListHeaderProps {
  allUploadsSuccessful: boolean;
  displayText: FileUploaderDisplayTextDefault;
  fileCount: number;
  remainingFilesCount: number;
  selectedFilesCount?: number;
}

export function FileListHeader({
  allUploadsSuccessful,
  displayText,
  fileCount,
  remainingFilesCount,
  selectedFilesCount = 0,
}: FileListHeaderProps): React.JSX.Element {
  const { getFilesUploadedText, getRemainingFilesText, getSelectedFilesText } =
    displayText;

  return (
    <Text className={ComponentClassName.FileUploaderPreviewerText}>
      {selectedFilesCount
        ? getSelectedFilesText(selectedFilesCount)
        : allUploadsSuccessful
        ? getFilesUploadedText(fileCount)
        : getRemainingFilesText(remainingFilesCount)}
    </Text>
  );
}
