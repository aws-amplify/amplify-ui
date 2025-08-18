import React from 'react';
import { HeadingElement, TextElement, ViewElement } from '../../elements';
import type { FileData } from '../../../actions';
import { formatFileSize } from '../../../views/utils/filePreview/fileSize';
import { getFileExtension } from '../../../views/utils/filePreview/fileType';
import { STORAGE_BROWSER_BLOCK } from '../constants';

interface FileMetadataProps {
  fileData: FileData;
}

const NONE = 'None';

export function FileMetadata({
  fileData,
}: FileMetadataProps): React.JSX.Element {
  const { key, lastModified, versionId = NONE, size, eTag } = fileData;
  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview-section`}>
      <HeadingElement
        className={`${STORAGE_BROWSER_BLOCK}__file-preview-title`}
      >
        File Information
      </HeadingElement>
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-metadata`}>
        {[
          { label: 'Key', value: key },
          { label: 'Size', value: formatFileSize(size) },
          { label: 'Version Id', value: versionId },
          {
            label: 'Last Modified',
            value: lastModified?.toLocaleString() || 'Unknown',
          },
          { label: 'Entity tag', value: eTag },
          {
            label: 'Type ',
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
