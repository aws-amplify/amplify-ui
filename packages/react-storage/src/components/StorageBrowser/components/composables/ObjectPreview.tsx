import React from 'react';
import type { ObjectPreviewData } from '../../views/hooks/useObjectPreview';
import { ImagePreview } from '../base/preview/ImagePreview';
import { useFilePreview } from '../../filePreview/context';
import { VideoPreview } from '../base/preview/VideoPreview';
import { TextPreview } from '../base/preview/TextPreview';
import { PreviewFallback } from '../base/preview/PreviewFallback';
import { ButtonElement, HeadingElement, IconElement } from '../elements';
import { PreviewPlaceholder } from '../base/preview/PreviewPlaceholder';
import type { AllFileTypes } from '../../createStorageBrowser/types';
import { FileMetadata } from '../base/preview/FileMetadata';

export interface ObjectPreviewProps extends ObjectPreviewData {
  onCloseObjectPreview?: () => void;
  retryPreview?: () => void;
}

export const ObjectPreview = (
  props: ObjectPreviewProps
): React.JSX.Element | null => {
  const { onCloseObjectPreview, hasLimitExceeded, retryPreview } = props;
  const { isLoading, hasError, selectedObject, url } = props;
  const { rendererResolver } = useFilePreview() ?? {};

  if (!selectedObject) return null;

  const { key, fileType } = selectedObject;

  function getDefaultRenderer(type?: AllFileTypes<any> | null) {
    switch (type) {
      case 'image':
        return <ImagePreview objectKey={key} url={url!} />;

      case 'video':
        return <VideoPreview objectKey={key} url={url!} />;

      case 'text':
        return <TextPreview objectKey={key} url={url!} />;

      default:
        return (
          <PreviewFallback
            objectKey={key}
            message="File preview not supported for this file type"
          />
        );
    }
  }

  function resolveRenderer() {
    if (rendererResolver && fileType) {
      const CustomRenderer = rendererResolver(fileType);
      if (CustomRenderer) {
        return <CustomRenderer url={url!} fileProperties={selectedObject!} />;
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
        minHeight: '100vh',
        padding: 15,
        border: '1px solid gray',
        borderRadius: '5px',
        marginLeft: '30px',
        paddingBottom: 30,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <ButtonElement variant="exit" onClick={onCloseObjectPreview}>
          <IconElement variant="dismiss" />
          Close
        </ButtonElement>
      </div>

      <div>
        {isLoading ? (
          <PreviewPlaceholder />
        ) : hasError ? (
          <PreviewFallback
            objectKey={key}
            message="Something went wrong"
            isError={hasError}
            onRetry={retryPreview}
            showRetry={hasError}
          />
        ) : hasLimitExceeded ? (
          <PreviewFallback
            objectKey={key}
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
            <FileMetadata fileData={selectedObject} />
          </>
        )}
      </div>
    </div>
  );
};
