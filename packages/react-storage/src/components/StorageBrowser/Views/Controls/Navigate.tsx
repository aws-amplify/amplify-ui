import React from 'react';
import { StorageBrowserElements } from '../../context/elements';

const { Span, Button, Nav, ListItem } = StorageBrowserElements;

type PermissionType = 'READ' | 'READWRITE' | 'WRITE';
type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';
interface LocationData {
  name: string;
  permissionType: PermissionType;
  locationType: LocationType;
}

type RenderNavigateItem = (props: { item: LocationData }) => React.JSX.Element;
interface NavigateItem<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends RenderNavigateItem,
    Pick<T, 'Button' | 'ListItem'> {
  Separator: T['Span'];
}

export interface NavigateControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { renderNavigateItem?: RenderNavigateItem }): React.JSX.Element;
  Container: T['Nav'];
  NavigateItem: NavigateItem<T>;
}

const NavigateItem: NavigateItem = () => <>Hi</>;
NavigateItem.Button = Button;
NavigateItem.Separator = Span;
NavigateItem.ListItem = ListItem;

export const NavigateControl: NavigateControl = (_props) => {
  return <>Navigate</>;
};
NavigateControl.Container = Nav;
NavigateControl.NavigateItem = NavigateItem;
