/* eslint-disable no-console */
import React from 'react';
import type { ObjectPreviewData } from '../../views/hooks/useObjectPreview';
import type { FileType } from '../../views/utils/objectPreview/const';
import { ImagePreview } from '../base/preview/ImagePreview';
import { useFilePreview } from '../../filePreview/context';
import { VideoPreview } from '../base/preview/VideoPreview';
import { TextPreview } from '../base/preview/TextPreview';
import { PreviewFallback } from '../base/preview/PreviewFallback';
import { ButtonElement, IconElement } from '../elements';
import { PreviewPlaceholder } from '../base/preview/PreviewPlaceholder';

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

  console.log('selectedObject ', selectedObject);

  if (!selectedObject) return null;

  const { key, fileType } = selectedObject;

  function getDefaultRenderer(type: FileType | null) {
    switch (type) {
      case 'image':
        return <ImagePreview objectKey={key} url={url!} />;

      case 'video':
        return <VideoPreview objectKey={key} url={url!} />;

      case 'text':
        return <TextPreview objectKey={key} url={url!} />;

      case 'unknown':
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
      const CustomRenderer = rendererResolver(fileType as FileType);
      if (CustomRenderer) {
        return <CustomRenderer url={url!} fileProperties={selectedObject!} />;
      }
    }
    return getDefaultRenderer(fileType as FileType);
  }

  return (
    <div
      style={{
        overflow: 'scroll',
        flex: 1,
        width: '50vw',
        height: '100vh',
        padding: 15,
        border: '1px solid gray',
        borderRadius: '5px',
        marginLeft: '30px',
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
            <div>{resolveRenderer()}</div>
            <div>{selectedObject?.key}</div>
          </>
        )}
      </div>
    </div>
  );
};
