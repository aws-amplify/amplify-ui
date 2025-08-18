import React from 'react';
import type { FileData } from '../../../actions';
import { useDisplayText } from '../../../displayText';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { HeadingElement, ViewElement } from '../../elements';
import { FileMetadata } from './FileMetadata';

interface FilePreviewLayoutProps {
  fileData: FileData;
  children: React.ReactNode;
}

export const FilePreviewLayout = ({
  fileData,
  children,
}: FilePreviewLayoutProps): React.JSX.Element => {
  const { LocationDetailView: displayText } = useDisplayText();

  return (
    <>
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview-section`}>
        <HeadingElement
          className={`${STORAGE_BROWSER_BLOCK}__file-preview-title`}
        >
          {displayText?.filePreview?.filePreviewTitle}
        </HeadingElement>
        {children}
      </ViewElement>
      <FileMetadata fileData={fileData} />
    </>
  );
};
