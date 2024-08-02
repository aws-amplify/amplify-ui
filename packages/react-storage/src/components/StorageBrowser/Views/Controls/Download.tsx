import React from 'react';
import { downloadData } from 'aws-amplify/storage';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button: ButtonElement, Icon: IconElement } = StorageBrowserElements;

interface DownloadActionInput {
  key: string;
}

interface DownloadActionResult {
  key: string;
}

function downloadAction(
  _: DownloadActionResult,
  { key: path }: DownloadActionInput
): Promise<DownloadActionResult> {
  downloadData({ path });
  return Promise.resolve({ key: path });
}

const BLOCK_NAME = `${CLASS_BASE}__download`;

export interface DownloadControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
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
        onClick={() => {
          downloadAction(undefined as unknown as DownloadActionResult, {
            key: '',
          });
        }}
      />
    );
  }
);

export const DownloadControl: DownloadControl = () => (
  <DownloadButton>
    <DownloadIcon />
  </DownloadButton>
);

DownloadControl.Button = DownloadButton;
DownloadControl.Icon = DownloadIcon;
