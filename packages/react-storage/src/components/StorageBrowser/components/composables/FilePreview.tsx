import React from 'react';
import type { FilePreviewState } from '../../views/hooks/useFilePreview';
import { ImagePreview } from '../base/preview/ImagePreview';
import { useFilePreviewContext } from '../../filePreview/context';
import { VideoPreview } from '../base/preview/VideoPreview';
import { TextPreview } from '../base/preview/TextPreview';
import { PreviewFallback } from '../base/preview/PreviewFallback';
import {
  ButtonElement,
  HeadingElement,
  IconElement,
  ViewElement,
} from '../elements';
import { PreviewPlaceholder } from '../base/preview/PreviewPlaceholder';
import type { AllFileTypes } from '../../createStorageBrowser/types';
import { FileMetadata } from '../base/preview/FileMetadata';
import { STORAGE_BROWSER_BLOCK } from '../base';
import { useDisplayText } from '../../displayText';

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
  const { LocationDetailView: displayText } = useDisplayText();

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
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview`}>
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview-header`}>
        <ButtonElement variant="exit" onClick={closeFilePreview}>
          <IconElement variant="dismiss" />
          {displayText?.filePreview?.closeButtonLabel}
        </ButtonElement>
      </ViewElement>

      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview-content`}>
        {isLoading ? (
          <PreviewPlaceholder />
        ) : hasError ? (
          <PreviewFallback
            fileKey={key}
            message={displayText?.filePreview?.errorMessage}
            isError={hasError}
            onRetry={retryFilePreview}
            showRetry={hasError}
          />
        ) : hasLimitExceeded ? (
          <PreviewFallback
            fileKey={key}
            message={displayText?.filePreview?.sizeLimitMessage}
          />
        ) : (
          <>
            <ViewElement
              className={`${STORAGE_BROWSER_BLOCK}__file-preview-section`}
            >
              <HeadingElement
                className={`${STORAGE_BROWSER_BLOCK}__file-preview-title`}
              >
                {displayText?.filePreview?.filePreviewTitle}
              </HeadingElement>
              {resolveRenderer()}
            </ViewElement>
            <FileMetadata fileData={previewedFile} />
          </>
        )}
      </ViewElement>
    </ViewElement>
  );
};
