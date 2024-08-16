import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Icon: IconElement } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__action-status`;

export interface _ActionStatusIconControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  ({ status }: ActionStatusIconProps): React.JSX.Element;
  Icon: T['Icon'];
}

export interface ActionStatusIconControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_ActionStatusIconControl<T>, 'Icon'> {
  ({ status }: ActionStatusIconProps): React.JSX.Element;
}

interface ActionStatusIconProps {
  status?: string;
}

const Icon = withBaseElementProps(IconElement, {
  className: `${BLOCK_NAME}`,
});

export const ActionStatusIconControl: ActionStatusIconControl = ({
  status,
}) => <Icon aria-label={status} />;
