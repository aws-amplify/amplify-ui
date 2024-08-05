import React from 'react';

import { useAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button: ButtonElement, Icon: IconElement } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__download`;

export interface DownloadControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { key: string }): React.JSX.Element;
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

export const DownloadControl: DownloadControl = ({ key }) => {
  const [, handleDownload] = useAction({
    type: 'DOWNLOAD',
  });

  return (
    <DownloadButton
      onClick={() =>
        handleDownload({
          key: key,
        })
      }
    >
      <DownloadIcon />
    </DownloadButton>
  );
};

DownloadControl.Button = DownloadButton;
DownloadControl.Icon = DownloadIcon;
