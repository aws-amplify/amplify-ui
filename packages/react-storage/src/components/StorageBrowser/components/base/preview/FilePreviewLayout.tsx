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

export function FilePreviewLayout({
  fileData,
  children,
}: FilePreviewLayoutProps): React.JSX.Element {
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: { filePreviewTitle },
  } = displayText;

  return (
    <>
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview-section`}>
        <HeadingElement
          className={`${STORAGE_BROWSER_BLOCK}__file-preview-title`}
        >
          {filePreviewTitle}
        </HeadingElement>
        <div className={`${STORAGE_BROWSER_BLOCK}__file-preview-content`}>
          {children}
        </div>
      </ViewElement>
      <FileMetadata fileData={fileData} />
    </>
  );
}
