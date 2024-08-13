import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button, Icon } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__refresh`;

export interface _RefreshControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

export interface RefreshControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_RefreshControl<T>, 'Button'> {
  (props: { onClick?: () => void; disabled?: boolean }): React.JSX.Element;
}

const RefreshIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__icon`,
  variant: 'refresh',
});

const RefreshButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}`,
  'aria-label': 'Refresh table',
  variant: 'refresh',
});

export const RefreshControl: RefreshControl = ({ onClick, disabled = false }) => (
  <RefreshButton onClick={onClick} disabled={disabled}>
    <RefreshIcon />
  </RefreshButton>
);
