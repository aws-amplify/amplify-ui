import React from 'react';
import { HeadingElement, TextElement, ViewElement } from '../../elements';
import type { FileData } from '../../../actions';
import { getFileExtension } from '../../../views/utils/files/fileType';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { useDisplayText } from '../../../displayText';
import { humanFileSize } from '@aws-amplify/ui';

interface FileMetadataProps {
  fileData: FileData;
}

const NONE = 'None';

export function FileMetadata({
  fileData,
}: FileMetadataProps): React.JSX.Element {
  const { key, lastModified, versionId = NONE, size, eTag } = fileData;
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: {
      keyLabel,
      sizeLabel,
      versionIdLabel,
      lastModifiedLabel,
      entityTagLabel,
      typeLabel,
      fileInformationTitle,
      unknownValue,
    },
  } = displayText;

  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview-section`}>
      <HeadingElement
        className={`${STORAGE_BROWSER_BLOCK}__file-preview-title`}
      >
        {fileInformationTitle}
      </HeadingElement>
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-metadata`}>
        {[
          { label: keyLabel, value: key },
          {
            label: sizeLabel,
            value: humanFileSize(size, true),
          },
          { label: versionIdLabel, value: versionId },
          {
            label: lastModifiedLabel,
            value: lastModified?.toLocaleString() || unknownValue,
          },
          { label: entityTagLabel, value: eTag },
          {
            label: typeLabel,
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
