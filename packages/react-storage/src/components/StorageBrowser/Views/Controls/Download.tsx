import React, { useEffect } from 'react';

import { downloadAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';
import { useDataState } from '@aws-amplify/ui-react-core';

const { Button: ButtonElement, Icon: IconElement } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__download`;

export interface DownloadControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { fileKey: string }): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

const DownloadIcon: typeof IconElement = React.forwardRef(
  function DownloadIcon(props, ref) {
    return (
      <IconElement
        {...props}
        ref={ref}
        className={`${BLOCK_NAME}__icon`}
        variant="download"
      />
    );
  }
);

const DownloadButton: typeof ButtonElement = React.forwardRef(
  function DownloadButton(props, ref) {
    return (
      <ButtonElement
        {...props}
        ref={ref}
        className={BLOCK_NAME}
        aria-label="Download item"
      />
    );
  }
);

function download(fileName: string, url: string) {
  const a = document.createElement('a');

  a.href = url;
  a.download = fileName;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}

export const DownloadControl: DownloadControl = ({ fileKey }) => {
  const [{ data }, handleDownload] = useDataState(downloadAction, {
    signedUrl: '',
  });

  const { signedUrl } = data;

  useEffect(() => {
    if (signedUrl && signedUrl !== '') {
      download(fileKey, signedUrl);
    }
  }, [signedUrl, fileKey]);

  return (
    <DownloadButton
      onClick={() => {
        handleDownload({
          key: fileKey,
        });
      }}
    >
      <DownloadIcon />
    </DownloadButton>
  );
};

DownloadControl.Button = DownloadButton;
DownloadControl.Icon = DownloadIcon;
