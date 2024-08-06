import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button: ButtonElement } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__action-cancel`;

export interface _ActionCancelControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
}

interface ActionCancelProps {
  onClick: () => void;
}

export interface ActionCancelControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_ActionCancelControl<T>, 'Button'> {
  ({ onClick }: ActionCancelProps): React.JSX.Element;
}

const Button = withBaseElementProps(ButtonElement, {
  className: `${BLOCK_NAME}`,
  variant: 'action-cancel',
  children: 'Cancel',
});

export const ActionCancelControl: ActionCancelControl = ({ onClick }) => (
  <Button onClick={onClick} />
);
