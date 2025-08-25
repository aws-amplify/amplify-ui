import React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { classNames } from '@aws-amplify/ui';
import { useAction } from '../../../useAction';
import { getFileKey } from '../../../actions';
import { ViewElement, TextElement, IconElement } from '../../elements';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { useDisplayText } from '../../../displayText';
import { getFileName } from '../../../views/utils/files/fileName';

export interface PreviewFallbackProps {
  fileKey: string;
  message: string;
  description?: string;
  isError?: boolean;
  onRetry?: () => void;
  showDownload?: boolean;
  showRetry?: boolean;
}

export function PreviewFallback({
  fileKey,
  message,
  description,
  isError = false,
  onRetry,
  showDownload = true,
  showRetry = false,
}: PreviewFallbackProps): React.JSX.Element {
  const [, handleDownload] = useAction('download');
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: {
      errorDescription,
      unsupportedFileDescription,
      filePrefix,
      retryButtonLabel,
      downloadButtonLabel,
    },
  } = displayText;

  const handleDownloadClick = () => {
    handleDownload({
      data: {
        fileKey: getFileKey(fileKey),
        key: fileKey,
        id: crypto.randomUUID(),
      },
    });
  };

  const fileName = getFileName(fileKey);
  const fallbackClass = isError
    ? `${STORAGE_BROWSER_BLOCK}__preview-fallback--error`
    : `${STORAGE_BROWSER_BLOCK}__preview-fallback--default`;

  return (
    <ViewElement
      className={classNames(
        `${STORAGE_BROWSER_BLOCK}__preview-fallback`,
        fallbackClass
      )}
    >
      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__preview-fallback-icon`}
      >
        <IconElement
          className="amplify-icon"
          variant={isError ? 'error' : `file`}
        />
      </ViewElement>

      <ViewElement>
        <TextElement
          className={`${STORAGE_BROWSER_BLOCK}__preview-fallback-title`}
        >
          {message}
        </TextElement>
        <TextElement
          className={`${STORAGE_BROWSER_BLOCK}__preview-fallback-description`}
        >
          {description ??
            (isError ? errorDescription : unsupportedFileDescription)}
        </TextElement>
        <TextElement
          className={`${STORAGE_BROWSER_BLOCK}__preview-fallback-filename`}
        >
          {filePrefix}
          {fileName}
        </TextElement>
      </ViewElement>

      {(showRetry || showDownload) && (
        <ViewElement
          className={`${STORAGE_BROWSER_BLOCK}__preview-fallback-actions`}
        >
          {showRetry && onRetry && (
            <Button
              size="small"
              variation="primary"
              onClick={onRetry}
              ariaLabel={`Retry loading ${fileName} file`}
            >
              {retryButtonLabel}
            </Button>
          )}

          {showDownload && (
            <Button
              size="small"
              onClick={handleDownloadClick}
              ariaLabel={`Download ${fileName} file`}
            >
              {downloadButtonLabel}
            </Button>
          )}
        </ViewElement>
      )}
    </ViewElement>
  );
}
