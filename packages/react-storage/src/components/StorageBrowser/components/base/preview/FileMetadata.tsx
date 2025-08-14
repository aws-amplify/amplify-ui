import React from 'react';
import { HeadingElement, TextElement } from '../../elements';
import type { FileData } from '../../../actions';
import { formatFileSize } from '../../../views/utils/objectPreview/fileSize';
import { getFileExtension } from '../../../views/utils/objectPreview/fileType';

interface FileMetadataProps {
  fileData: FileData;
}

const NONE = 'None';

export function FileMetadata({
  fileData,
}: FileMetadataProps): React.JSX.Element {
  const { key, lastModified, versionId = NONE, size, eTag } = fileData;
  return (
    <div>
      <HeadingElement
        style={{
          marginBottom: '16px',
          color: '#374151',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        File Information
      </HeadingElement>
      <div
        style={{
          display: 'grid',
          gap: '12px',
          backgroundColor: '#f9fafb',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
        }}
      >
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
          <div
            key={label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <TextElement
              style={{
                fontWeight: '500',
                color: '#374151',
                margin: 0,
              }}
            >
              {label}:
            </TextElement>
            <TextElement
              style={{
                color: '#6b7280',
                margin: 0,
                wordBreak: 'break-all',
                textAlign: 'right',
                maxWidth: '60%',
              }}
            >
              {value}
            </TextElement>
          </div>
        ))}
      </div>
    </div>
  );
}
