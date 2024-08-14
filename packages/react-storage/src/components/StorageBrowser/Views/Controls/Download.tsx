import React, { useEffect } from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { downloadAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';
import { useDataState } from '@aws-amplify/ui-react-core';
import { useGetLocationConfig } from '../../context/config';

const { Button, Icon } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__download`;

export interface DownloadControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { fileKey: string }): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

const DownloadIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__icon`,
  variant: 'download',
});

const DownloadButton = withBaseElementProps(Button, {
  className: BLOCK_NAME,
  variant: 'download',
});

function download(fileName: string, url: string) {
  const a = document.createElement('a');

  a.href = url;
  a.download = fileName;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}

export const DownloadControl: DownloadControl = ({ fileKey }) => {
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
    <DownloadButton
      aria-label={`Download ${fileKey}`}
      onClick={() => {
        handleDownload({
          config: getConfig,
          key: fileKey,
        });
        setShouldDownload(true);
      }}
    >
      <DownloadIcon />
    </DownloadButton>
  );
};

DownloadControl.Button = DownloadButton;
DownloadControl.Icon = DownloadIcon;
