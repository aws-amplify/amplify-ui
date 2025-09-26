import React from 'react';
import type {
  EnabledFilePreviewState,
  FilePreviewState,
} from '../../views/hooks/useFilePreview';
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
import type { FileData } from '../../actions';
import { DownloadButton } from '../base/preview/DownloadButton';

export type FilePreviewProps = {
  activeFileHasNext?: boolean;
  activeFileHasPrev?: boolean;
  activeFile?: FileData;
  filePreview?: FilePreviewState;
  onSelectActiveFile?: (f?: FileData | 'prev' | 'next') => void;
  onRetryFilePreview?: () => void;
};

const rendererMap: Record<NonNullable<AllFileTypes>, PreviewComponent> = {
  image: ImagePreview,
  video: VideoPreview,
  text: TextPreview,
} as const;

const DefaultRenderer: React.FC<{
  fileKey: string;
  url: string;
  type?: AllFileTypes | null;
}> = ({ url, type, fileKey }) => {
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: { unsupportedFileDescription, unsupportedFileMessage },
  } = displayText;
  if (type && type in rendererMap) {
    const PreviewComponent = rendererMap[type];
    return <PreviewComponent fileKey={fileKey} url={url} />;
  }

  return (
    <PreviewFallback
      fileKey={fileKey}
      message={unsupportedFileMessage}
      description={unsupportedFileDescription}
    />
  );
};
const ResolvedRenderer: React.FC<{
  fileKey: string;
  url: string;
  fileData: FileData;
}> = ({ fileKey, url, fileData }) => {
  const { rendererResolver } = (useFilePreviewContext() ?? {}) || {};
  if (rendererResolver && fileData.fileType) {
    const CustomRenderer = rendererResolver(fileData.fileType);
    if (CustomRenderer) {
      return <CustomRenderer url={url} fileData={fileData} />;
    }
  }
  return (
    <DefaultRenderer fileKey={fileKey} url={url} type={fileData.fileType} />
  );
};
const FilePreviewContent: React.FC<{
  filePreview: EnabledFilePreviewState;
  activeFile: FileData;
  onRetryFilePreview: () => void;
  onSelectActiveFile: (f?: FileData | 'prev' | 'next') => void;
  activeFileHasNext?: boolean;
  activeFileHasPrev?: boolean;
}> = ({
  filePreview,
  activeFile,
  onRetryFilePreview,
  onSelectActiveFile,
  activeFileHasNext,
  activeFileHasPrev,
}) => {
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: {
      errorMessage,
      sizeLimitMessage,
      generalPreviewErrorDescription,
      fileSizeLimitDescription,
    },
  } = displayText;
  const { key } = activeFile;

  if (filePreview.isLoading) {
    return (
      <FilePreviewLayout fileData={activeFile}>
        <PreviewPlaceholder />
      </FilePreviewLayout>
    );
  }
  if (!filePreview.ok) {
    if (filePreview.error === 'LIMIT_EXCEEDED') {
      return (
        <FilePreviewLayout fileData={activeFile}>
          <PreviewFallback
            fileKey={key}
            message={sizeLimitMessage}
            description={fileSizeLimitDescription}
          />
        </FilePreviewLayout>
      );
    }
    return (
      <FilePreviewLayout fileData={activeFile}>
        <PreviewFallback
          fileKey={key}
          message={errorMessage}
          description={generalPreviewErrorDescription}
          isError
          onRetry={onRetryFilePreview}
          showRetry
        />
      </FilePreviewLayout>
    );
  }
  return (
    <FilePreviewLayout fileData={filePreview.fileData}>
      <ResolvedRenderer
        fileKey={key}
        url={filePreview.url}
        fileData={filePreview.fileData}
      />
      <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
        <ButtonElement
          disabled={!activeFileHasPrev}
          onClick={() => onSelectActiveFile('prev')}
          variant={'paginate-previous'}
        >
          <IconElement variant={'paginate-previous'} />
        </ButtonElement>
        <DownloadButton fileKey={key} />
        <ButtonElement
          disabled={!activeFileHasNext}
          onClick={() => onSelectActiveFile('next')}
          variant={'paginate-next'}
        >
          <IconElement variant={'paginate-next'} />
        </ButtonElement>
      </div>
    </FilePreviewLayout>
  );
};
export function FilePreview(props: FilePreviewProps): React.JSX.Element | null {
  const {
    filePreview,
    activeFileHasNext,
    activeFileHasPrev,
    onRetryFilePreview = () => undefined,
    activeFile,
    onSelectActiveFile = () => undefined,
  } = props;
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: { closeButtonLabel },
  } = displayText;

  if (!activeFile || !filePreview) {
    return null;
  }
  if (!filePreview.enabled) {
    return null;
  }

  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview`}>
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__file-preview-header`}>
        <ButtonElement
          variant="exit"
          onClick={() => onSelectActiveFile(undefined)}
        >
          <IconElement variant="dismiss" />
          {closeButtonLabel}
        </ButtonElement>
      </ViewElement>

      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__file-preview-container`}
      >
        <FilePreviewContent
          filePreview={filePreview}
          activeFile={activeFile}
          activeFileHasNext={activeFileHasNext}
          activeFileHasPrev={activeFileHasPrev}
          onRetryFilePreview={onRetryFilePreview}
          onSelectActiveFile={onSelectActiveFile}
        />
      </ViewElement>
    </ViewElement>
  );
}
