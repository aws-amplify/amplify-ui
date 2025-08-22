import React from 'react';
import type { FilePreviewState } from '../../views/hooks/useFilePreview';
import { ImagePreview } from '../base/preview/ImagePreview';
import { useFilePreviewContext } from '../../filePreview/context';
import { VideoPreview } from '../base/preview/VideoPreview';
import { TextPreview } from '../base/preview/TextPreview';
import { PreviewFallback } from '../base/preview/PreviewFallback';
import { ButtonElement, IconElement, ViewElement } from '../elements';
import { PreviewPlaceholder } from '../base/preview/PreviewPlaceholder';
import type { AllFileTypes } from '../../createStorageBrowser/types';
import { STORAGE_BROWSER_BLOCK } from '../base';
import { useDisplayText } from '../../displayText';
import { FilePreviewLayout } from '../base/preview/FilePreviewLayout';
import { exhaustiveCheck } from '../../views/utils/exhaustiveCheck';

export interface FilePreviewProps extends FilePreviewState {
  onCloseFilePreview?: () => void;
  onRetryFilePreview?: () => void;
}

export function FilePreview(props: FilePreviewProps): React.JSX.Element | null {
  const { onCloseFilePreview, hasLimitExceeded, onRetryFilePreview } = props;
  const { isLoading, hasError, previewedFile, url = ' ' } = props;
  const { rendererResolver } = useFilePreviewContext() ?? {};
  const { LocationDetailView: displayText } = useDisplayText();
  const { filePreview } = displayText;
  const {
    closeButtonLabel,
    unsupportedFileDescription,
    errorMessage,
    sizeLimitMessage,
    generalPreviewErrorDescription,
    fileSizeLimitDescription,
    unsupportedFileMessage,
  } = filePreview;

  if (!previewedFile) return null;

  const { key, fileType } = previewedFile;

  function getDefaultRenderer(type?: AllFileTypes | null) {
    const fileUrl = url ?? '';

    switch (type) {
      case 'image':
        return <ImagePreview fileKey={key} url={fileUrl} />;

      case 'video':
        return <VideoPreview fileKey={key} url={fileUrl} />;

      case 'text':
        return <TextPreview fileKey={key} url={fileUrl} />;

      case null:
      case undefined:
        return (
          <PreviewFallback
            fileKey={key}
            message={unsupportedFileMessage}
            description={unsupportedFileDescription}
          />
        );

      default:
        return exhaustiveCheck(type);
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
        <ButtonElement variant="exit" onClick={onCloseFilePreview}>
          <IconElement variant="dismiss" />
          {closeButtonLabel}
        </ButtonElement>
      </ViewElement>

      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview-content`}>
        {isLoading ? (
          <FilePreviewLayout fileData={previewedFile}>
            <PreviewPlaceholder />
          </FilePreviewLayout>
        ) : hasError ? (
          <FilePreviewLayout fileData={previewedFile}>
            <PreviewFallback
              fileKey={key}
              message={errorMessage}
              description={generalPreviewErrorDescription}
              isError={hasError}
              onRetry={onRetryFilePreview}
              showRetry={hasError}
            />
          </FilePreviewLayout>
        ) : hasLimitExceeded ? (
          <FilePreviewLayout fileData={previewedFile}>
            <PreviewFallback
              fileKey={key}
              message={sizeLimitMessage}
              description={fileSizeLimitDescription}
            />
          </FilePreviewLayout>
        ) : (
          <FilePreviewLayout fileData={previewedFile}>
            {resolveRenderer()}
          </FilePreviewLayout>
        )}
      </ViewElement>
    </ViewElement>
  );
}
