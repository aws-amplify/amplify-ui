import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button: ButtonElement, Icon } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__exit`;

export interface _ExitControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

interface ExitProps {
  onClick?: () => void;
}

export interface ExitControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_ExitControl<T>, 'Button' | 'Icon'> {
  ({ onClick }: ExitProps): React.JSX.Element;
}

const Button = withBaseElementProps(ButtonElement, {
  className: `${BLOCK_NAME}`,
  variant: 'exit',
});

export const ExitControl: ExitControl = ({ onClick }) => (
  <Button onClick={onClick}>
    <Icon variant="exit" /> Back
  </Button>
);
