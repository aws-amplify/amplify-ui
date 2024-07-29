import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button, Icon } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__download`;

export interface DownloadControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

const DownloadIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__icon`,
  variant: 'download',
});

const DownloadButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}`,
  'aria-label': 'Download item',
  onClick: () => {
    /** TODO handleDownload */
  },
});

export const DownloadControl: DownloadControl = () => (
  <DownloadButton>
    <DownloadIcon />
  </DownloadButton>
);

DownloadControl.Button = DownloadButton;
DownloadControl.Icon = DownloadIcon;
