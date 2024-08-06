import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button: ButtonElement } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__action-start`;

export interface _ActionStartControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
}

interface ActionStartProps {
  onClick: () => void;
}

export interface ActionStartControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_ActionStartControl<T>, 'Button'> {
  ({ onClick }: ActionStartProps): React.JSX.Element;
}

const Button = withBaseElementProps(ButtonElement, {
  className: `${BLOCK_NAME}`,
  variant: 'action-start',
  children: 'Start',
});

export const ActionStartControl: ActionStartControl = ({ onClick }) => (
  <Button onClick={onClick} />
);
