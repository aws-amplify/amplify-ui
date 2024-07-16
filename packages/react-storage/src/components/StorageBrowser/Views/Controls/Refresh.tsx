import React from 'react';
import { StorageBrowserElements } from '../../context/elements';

export interface RefreshControl<T extends StorageBrowserElements>
  extends Pick<T, 'Button' | 'Icon'> {
  (): React.JSX.Element;
}
