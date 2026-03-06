import { STORAGE_BROWSER_BLOCK } from '../constants';
import { ButtonElement, IconElement } from '../../elements';
import React, { useCallback, useMemo } from 'react';
import { getFileName } from '../../../views/utils/files/fileName';
import { useAction } from '../../../useAction';
import { useDisplayText } from '../../../displayText';

export const DownloadButton: React.FC<{
  fileKey: string;
}> = ({ fileKey }) => {
  const [{ isProcessing: downloadPending }, handleDownload] =
    useAction('download');
  const fileName = useMemo(() => getFileName(fileKey), [fileKey]);
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: { downloadButtonLabel },
  } = displayText;

  const handleDownloadClick = useCallback(() => {
    handleDownload({
      data: {
        fileKey: fileName,
        key: fileKey,
        id: crypto.randomUUID(),
      },
    });
  }, [fileName, fileKey, handleDownload]);
  return (
    <ButtonElement
      {...{
        ['aria-label']: `Download ${fileName} file`,
      }}
      className={`${STORAGE_BROWSER_BLOCK}__download-button`}
      onClick={handleDownloadClick}
      disabled={downloadPending}
      variant="primary"
    >
      {downloadPending ? (
        <IconElement
          className={`${STORAGE_BROWSER_BLOCK}__download-button_icon`}
          variant="action-progress"
        />
      ) : null}
      {downloadButtonLabel}
    </ButtonElement>
  );
};
