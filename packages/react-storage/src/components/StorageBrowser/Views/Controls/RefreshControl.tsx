import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, Icon } = StorageBrowserElements;

const BLOCK_NAME = `refresh`;

export interface RefreshControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): React.JSX.Element;
  RefreshButton: T['Button'];
  RefreshIcon: T['Icon'];
}

const RefreshIcon = withBaseElementProps(Icon, {
  children: <text fill="currentColor">refresh</text>,
  className: `${BLOCK_NAME}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

const RefreshButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
  'aria-label': 'Refresh table',
});

export const RefreshControl: RefreshControl = () => (
  <RefreshButton>
    <RefreshIcon />
  </RefreshButton>
);

RefreshControl.RefreshButton = RefreshButton;
RefreshControl.RefreshIcon = RefreshIcon;
