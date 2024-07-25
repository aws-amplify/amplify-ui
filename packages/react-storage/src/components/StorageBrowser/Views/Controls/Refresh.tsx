import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button, Icon } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__refresh`;

export interface RefreshControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

const RefreshIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__icon`,
  variant: 'refresh',
});

const RefreshButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}`,
  'aria-label': 'Refresh table',
});

export const RefreshControl: RefreshControl = () => (
  <RefreshButton>
    <RefreshIcon />
  </RefreshButton>
);

RefreshControl.Button = RefreshButton;
RefreshControl.Icon = RefreshIcon;
