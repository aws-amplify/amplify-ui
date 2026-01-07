import React from 'react';
import { DownloadButton } from './DownloadButton';
import { classNames } from '@aws-amplify/ui';
import {
  ButtonElement,
  IconElement,
  TextElement,
  ViewElement,
} from '../../elements';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { useDisplayText } from '../../../displayText';
import { getFileName } from '../../../views/utils/files/fileName';
import { getFileThumbnail } from '../../../views/LocationDetailView/getLocationDetailViewTableData/fileIcon';

export interface PreviewFallbackProps {
  fileKey: string;
  message: string;
  description?: string;
  isError?: boolean;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function PreviewFallback({
  fileKey,
  message,
  description,
  isError = false,
  onRetry,
  showRetry = false,
}: PreviewFallbackProps): React.JSX.Element {
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: {
      errorDescription,
      unsupportedFileDescription,
      filePrefix,
      retryButtonLabel,
    },
  } = displayText;

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
          variant={isError ? 'error' : getFileThumbnail(fileKey)}
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

      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__preview-fallback-actions`}
      >
        {showRetry && onRetry && (
          <ButtonElement
            variant="primary"
            onClick={onRetry}
            {...{
              ['aria-label']: `Retry loading ${fileName} file`,
            }}
          >
            {retryButtonLabel}
          </ButtonElement>
        )}
        <DownloadButton fileKey={fileKey} />
      </ViewElement>
    </ViewElement>
  );
}
