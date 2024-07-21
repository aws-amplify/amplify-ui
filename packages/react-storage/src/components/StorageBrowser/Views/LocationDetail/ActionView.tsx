import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { Controls, TableControl } from '../Controls';
import { CommonControl, ViewComponent } from '../types';

interface ActionViewControls<T extends StorageBrowserElements>
  extends Pick<Controls<T>, CommonControl | 'Summary'> {
  (): React.JSX.Element;
}

// @ts-expect-error
const ActionViewControls: ActionViewControls<StorageBrowserElements> = {};

export interface ActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<T, ActionViewControls<T>> {}

export const ActionView: ActionView = () => {
  return <>ActionView</>;
};

ActionView.Controls = ActionViewControls;
ActionView.Table = TableControl;
