import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Divider } = StorageBrowserElements;

const BLOCK_NAME = 'divider';

export interface DividerControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Bar: T['Divider'];
}

const Bar = withBaseElementProps(Divider, {
  className: `${BLOCK_NAME}`,
  'aria-hidden': true,
});

export const DividerControl: DividerControl = () => <Bar />;

DividerControl.Bar = Bar;
