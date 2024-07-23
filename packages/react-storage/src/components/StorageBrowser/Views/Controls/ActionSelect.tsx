import React from 'react';
import { StorageBrowserElements } from '../../context/elements';

const { Button, Icon, ListItem, UnorderedList } = StorageBrowserElements;

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

interface ActionItem<T extends StorageBrowserElements = StorageBrowserElements>
  extends RenderActionItem,
    Pick<T, 'Button' | 'ListItem' | 'Icon'> {}

interface ActionsList<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { renderActionItem?: RenderActionItem }): React.JSX.Element;
  List: T['UnorderedList'];
  ActionItem: ActionItem<T>;
}

interface Toggle<T extends StorageBrowserElements = StorageBrowserElements>
  extends Pick<T, 'Button' | 'Icon'> {
  (): React.JSX.Element;
}

export interface ActionSelectControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  ActionsList: ActionsList<T>;
  Toggle: Toggle<T>;
}

const ActionItem: ActionItem = () => <>Hi</>;

ActionItem.Button = Button;
ActionItem.ListItem = ListItem;
ActionItem.Icon = Icon;

const ActionsList: ActionsList = () => <>Hi</>;

ActionsList.ActionItem = ActionItem;

ActionsList.List = UnorderedList;

const Toggle: Toggle = () => <>Hi</>;

Toggle.Button = Button;
Toggle.Icon = Icon;

export const ActionSelectControl: ActionSelectControl = () => <>Hi</>;
ActionSelectControl.ActionsList = ActionsList;
ActionSelectControl.Toggle = Toggle;
