import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button: ButtonElement } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__exit`;

export interface _ExitControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
}

interface ExitProps {
  onClick?: () => void;
}

export interface ExitControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_ExitControl<T>, 'Button'> {
  ({ onClick }: ExitProps): React.JSX.Element;
}

const Button = withBaseElementProps(ButtonElement, {
  className: `${BLOCK_NAME}`,
  variant: 'exit',
  children: 'Back',
});

export const ExitControl: ExitControl = ({ onClick }) => (
  <Button onClick={onClick} />
);
