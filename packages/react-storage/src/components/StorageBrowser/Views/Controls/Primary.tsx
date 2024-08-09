import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button: ButtonElement } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__primary`;

export interface _PrimaryControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
}

interface PrimaryProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface PrimaryControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_PrimaryControl<T>, 'Button'> {
  ({ onClick }: PrimaryProps): React.JSX.Element;
}

const Button = withBaseElementProps(ButtonElement, {
  className: `${BLOCK_NAME}`,
  variant: 'primary',
});

export const PrimaryControl: PrimaryControl = ({
  onClick,
  disabled,
  children,
}) => (
  <Button onClick={onClick} disabled={disabled}>
    {children ?? 'Start'}
  </Button>
);
