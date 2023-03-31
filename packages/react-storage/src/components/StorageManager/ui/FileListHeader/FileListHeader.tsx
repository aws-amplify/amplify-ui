import React from 'react';
import { StorageManagerDisplayText } from '../../utils/displayText';
import { ComponentClassNames, Text } from '@aws-amplify/ui-react';

export interface FileListHeaderProps {
  fileCount: number;
  remainingFilesCount: number;
  displayText: StorageManagerDisplayText;
  allUploadsSuccessful: boolean;
}

export function FileListHeader({
  fileCount,
  remainingFilesCount,
  displayText,
  allUploadsSuccessful,
}: FileListHeaderProps): JSX.Element {
  const { getFilesUploadedText, getRemainingFilesText } = displayText;
  return (
    <Text className={ComponentClassNames.StorageManagerPreviewerText}>
      {allUploadsSuccessful
        ? getFilesUploadedText(fileCount)
        : getRemainingFilesText(remainingFilesCount)}
    </Text>
  );
}
