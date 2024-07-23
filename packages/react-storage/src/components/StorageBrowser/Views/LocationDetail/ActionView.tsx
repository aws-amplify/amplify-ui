import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { Controls, TableControl } from '../Controls';
import { CommonControl, ViewComponent } from '../types';
import { ViewTypeProvider } from '../ViewContext';

interface ActionViewControls<T extends StorageBrowserElements>
  extends Pick<Controls<T>, CommonControl | 'Summary'> {
  (): React.JSX.Element;
}

// @ts-expect-error
const ActionViewControls: ActionViewControls<StorageBrowserElements> = {};

export interface ActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<T, ActionViewControls<T>> {}

const ActionViewProvider = (props: { children?: React.ReactNode }) => (
  <ViewTypeProvider {...props} type="ACTION" />
);

export const ActionView: ActionView = () => {
  return <ActionViewProvider>ActionView</ActionViewProvider>;
};

ActionView.Controls = ActionViewControls;
ActionView.Provider = ActionViewProvider;
ActionView.Table = TableControl;
