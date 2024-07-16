import React from 'react';
import { StorageBrowserElements } from '../../context/elements';

type PermissionType = 'READ' | 'READWRITE' | 'WRITE';

interface FolderData {
  key: string;
  type: 'FOLDER';
}
interface FileData {
  key: string;
  lastModified: Date;
  size: number;
  type: 'FILE';
}
type LocationItem = FileData | FolderData;

interface Action {
  displayName: string;
  hide?: (permissionType: PermissionType) => boolean;
  disable?: (selected: LocationItem[] | undefined) => boolean;
  type: string;
}

type RenderActionItem = (props: { action: Action }) => React.JSX.Element;

interface ActionItem<T extends StorageBrowserElements>
  extends RenderActionItem,
    Pick<T, 'Button' | 'ListItem' | 'Icon'> {}

interface ActionsList<T extends StorageBrowserElements> {
  (props: { renderActionItem?: RenderActionItem }): React.JSX.Element;
  List: T['UnorderedList'];
  ActionItem: ActionItem<T>;
}

interface Toggle<T extends StorageBrowserElements>
  extends Pick<T, 'Button' | 'Icon'> {
  (): React.JSX.Element;
}

export interface ActionSelectControl<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  Toggle: Toggle<T>;
  ActionsList: ActionsList<T>;
}
