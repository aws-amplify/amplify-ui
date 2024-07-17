import React from 'react';
import { StorageBrowserElements } from '../../context/elements';

type PermissionType = 'READ' | 'READWRITE' | 'WRITE';
type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';
interface LocationData {
  name: string;
  permissionType: PermissionType;
  locationType: LocationType;
}

type RenderNavigateItem = (props: { item: LocationData }) => React.JSX.Element;
interface NavigateItem<T extends StorageBrowserElements>
  extends RenderNavigateItem,
    Pick<T, 'Button' | 'ListItem'> {
  Separator: T['Span'];
}

export interface NavigateControl<T extends StorageBrowserElements> {
  (props: { renderNavigateItem?: RenderNavigateItem }): React.JSX.Element;
  Container: T['Nav'];
  NavigateItem: NavigateItem<T>;
}
