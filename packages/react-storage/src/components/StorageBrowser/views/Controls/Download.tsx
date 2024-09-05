import React, { useEffect } from 'react';

import { useDataState } from '@aws-amplify/ui-react-core';

import { downloadAction } from '../../context/actions';
import { CLASS_BASE } from '../constants';
import { useGetLocationConfig } from '../../context/config';
import { ButtonElement } from '../../context/elements/definitions';
import { IconElement } from '../../context/elements/IconElement';

const BLOCK_NAME = `${CLASS_BASE}__download`;

function download(fileName: string, url: string) {
  const a = document.createElement('a');

  a.href = url;
  a.download = fileName;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}

interface DownloadControlProps {
  fileKey: string;
}

export const DownloadControl = ({
  fileKey,
}: DownloadControlProps): React.JSX.Element => {
  const getConfig = useGetLocationConfig();
  const [{ data }, handleDownload] = useDataState(downloadAction, {
    signedUrl: '',
  });

  const [shouldDownload, setShouldDownload] = React.useState(false);

  const { signedUrl } = data;

  useEffect(() => {
    if (shouldDownload && signedUrl && signedUrl !== '') {
      download(fileKey, signedUrl);
      setShouldDownload(false);
    }
  }, [signedUrl, fileKey, shouldDownload]);

  return (
    <ButtonElement
      aria-label={`Download ${fileKey}`}
      className={BLOCK_NAME}
      variant="download"
      onClick={() => {
        handleDownload({
          config: getConfig,
          key: fileKey,
        });
        setShouldDownload(true);
      }}
    >
      <IconElement variant="download" className={`${BLOCK_NAME}__icon`} />
    </ButtonElement>
  );
};
