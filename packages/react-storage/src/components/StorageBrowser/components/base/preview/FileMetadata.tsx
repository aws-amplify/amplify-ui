import React from 'react';
import { HeadingElement, TextElement, ViewElement } from '../../elements';
import type { FileData } from '../../../actions';
import { formatFileSize } from '../../../views/utils/filePreview/fileSize';
import { getFileExtension } from '../../../views/utils/filePreview/fileType';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { useDisplayText } from '../../../displayText';

interface FileMetadataProps {
  fileData: FileData;
}

const NONE = 'None';

export function FileMetadata({
  fileData,
}: FileMetadataProps): React.JSX.Element {
  const { key, lastModified, versionId = NONE, size, eTag } = fileData;
  const { LocationDetailView: displayText } = useDisplayText();

  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview-section`}>
      <HeadingElement
        className={`${STORAGE_BROWSER_BLOCK}__file-preview-title`}
      >
        {displayText?.filePreview?.fileInformationTitle}
      </HeadingElement>
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-metadata`}>
        {[
          { label: displayText?.filePreview?.keyLabel, value: key },
          {
            label: displayText?.filePreview?.sizeLabel,
            value: formatFileSize(size),
          },
          { label: displayText?.filePreview?.versionIdLabel, value: versionId },
          {
            label: displayText?.filePreview?.lastModifiedLabel,
            value:
              lastModified?.toLocaleString() ||
              displayText?.filePreview?.unknownValue,
          },
          { label: displayText?.filePreview?.entityTagLabel, value: eTag },
          {
            label: displayText?.filePreview?.typeLabel,
            value: getFileExtension(key) ?? NONE,
          },
        ].map(({ label, value }) => (
          <ViewElement
            key={label}
            className={`${STORAGE_BROWSER_BLOCK}__file-metadata-item`}
          >
            <TextElement
              className={`${STORAGE_BROWSER_BLOCK}__file-metadata-label`}
            >
              {label}:
            </TextElement>
            <TextElement
              className={`${STORAGE_BROWSER_BLOCK}__file-metadata-value`}
            >
              {value}
            </TextElement>
          </ViewElement>
        ))}
      </ViewElement>
    </ViewElement>
  );
}
