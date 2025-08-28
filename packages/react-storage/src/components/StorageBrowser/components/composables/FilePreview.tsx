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
import type { PreviewComponent } from '../base/preview/type';

export interface FilePreviewProps extends FilePreviewState {
  onCloseFilePreview?: () => void;
  onRetryFilePreview?: () => void;
}

const rendererMap: Record<NonNullable<AllFileTypes>, PreviewComponent> = {
  image: ImagePreview,
  video: VideoPreview,
  text: TextPreview,
} as const;

export function FilePreview(props: FilePreviewProps): React.JSX.Element | null {
  const { onCloseFilePreview, hasLimitExceeded, onRetryFilePreview } = props;
  const { isLoading, hasError, previewedFile, url = ' ' } = props;
  const { rendererResolver } = useFilePreviewContext() ?? {};
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: {
      closeButtonLabel,
      unsupportedFileDescription,
      errorMessage,
      sizeLimitMessage,
      generalPreviewErrorDescription,
      fileSizeLimitDescription,
      unsupportedFileMessage,
    },
  } = displayText;

  if (!previewedFile) return null;

  const { key, fileType } = previewedFile;

  function getDefaultRenderer(type?: AllFileTypes | null) {
    if (type && type in rendererMap) {
      const PreviewComponent = rendererMap[type];
      return <PreviewComponent fileKey={key} url={url ?? ''} />;
    }

    return (
      <PreviewFallback
        fileKey={key}
        message={unsupportedFileMessage}
        description={unsupportedFileDescription}
      />
    );
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
