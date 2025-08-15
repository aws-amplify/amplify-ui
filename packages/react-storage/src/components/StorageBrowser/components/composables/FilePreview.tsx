import React from 'react';
import type { FilePreviewState } from '../../views/hooks/useFilePreview';
import { ImagePreview } from '../base/preview/ImagePreview';
import { useFilePreviewContext } from '../../filePreview/context';
import { VideoPreview } from '../base/preview/VideoPreview';
import { TextPreview } from '../base/preview/TextPreview';
import { PreviewFallback } from '../base/preview/PreviewFallback';
import { ButtonElement, HeadingElement, IconElement } from '../elements';
import { PreviewPlaceholder } from '../base/preview/PreviewPlaceholder';
import type { AllFileTypes } from '../../createStorageBrowser/types';
import { FileMetadata } from '../base/preview/FileMetadata';

export interface FilePreviewProps extends FilePreviewState {
  closeFilePreview?: () => void;
  retryFilePreview?: () => void;
}

export const FilePreview = (
  props: FilePreviewProps
): React.JSX.Element | null => {
  const { closeFilePreview, hasLimitExceeded, retryFilePreview } = props;
  const { isLoading, hasError, previewedFile, url } = props;
  const { rendererResolver } = useFilePreviewContext() ?? {};

  if (!previewedFile) return null;

  const { key, fileType } = previewedFile;

  function getDefaultRenderer(type?: AllFileTypes<any> | null) {
    switch (type) {
      case 'image':
        return <ImagePreview fileKey={key} url={url!} />;

      case 'video':
        return <VideoPreview fileKey={key} url={url!} />;

      case 'text':
        return <TextPreview fileKey={key} url={url!} />;

      default:
        return (
          <PreviewFallback
            fileKey={key}
            message="File preview not supported for this file type"
          />
        );
    }
  }

  function resolveRenderer() {
    if (rendererResolver && fileType) {
      const CustomRenderer = rendererResolver(fileType);
      if (CustomRenderer) {
        return <CustomRenderer url={url!} fileData={previewedFile!} />;
      }
    }
    return getDefaultRenderer(fileType);
  }

  return (
    <div
      style={{
        overflow: 'scroll',
        flex: 1,
        width: '50vw',
        height: '100%',
        padding: 15,
        border: '1px solid gray',
        borderRadius: '5px',
        marginLeft: '30px',
        paddingBottom: 30,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <ButtonElement variant="exit" onClick={closeFilePreview}>
          <IconElement variant="dismiss" />
          Close
        </ButtonElement>
      </div>

      <div>
        {isLoading ? (
          <PreviewPlaceholder />
        ) : hasError ? (
          <PreviewFallback
            fileKey={key}
            message="Something went wrong"
            isError={hasError}
            onRetry={retryFilePreview}
            showRetry={hasError}
          />
        ) : hasLimitExceeded ? (
          <PreviewFallback
            fileKey={key}
            message="File preview not possible due to preview size limit"
          />
        ) : (
          <>
            <div>
              <HeadingElement
                style={{
                  marginBottom: '16px',
                  color: '#374151',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                File Preview
              </HeadingElement>
              <div>{resolveRenderer()}</div>
            </div>
            <FileMetadata fileData={previewedFile} />
          </>
        )}
      </div>
    </div>
  );
};
