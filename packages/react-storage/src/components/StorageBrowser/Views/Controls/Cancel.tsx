import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button, Icon } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__cancel`;

export interface _CancelControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

export interface CancelControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_CancelControl<T>, 'Button'> {
  (props: { onClick?: () => void; ariaLabel?: string }): React.JSX.Element;
}

const CancelIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__icon`,
  variant: 'cancel',
});

const CancelButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}`,
  variant: 'cancel',
});

export const CancelControl: CancelControl = ({ onClick, ariaLabel }) => (
  <CancelButton onClick={onClick} aria-label={ariaLabel}>
    <CancelIcon />
  </CancelButton>
);
