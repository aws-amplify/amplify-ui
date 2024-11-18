import * as React from 'react';

type StorageBrowserIconType =
  | 'action-canceled'
  | 'action-error'
  | 'action-initial'
  | 'action-progress'
  | 'action-queued'
  | 'action-success'
  | 'cancel'
  | 'create-folder'
  | 'copy-file'
  | 'delete-file'
  | 'dismiss'
  | 'download'
  | 'error'
  | 'exit'
  | 'file'
  | 'folder'
  | 'info'
  | 'loading'
  | 'menu'
  | 'paginate-next'
  | 'paginate-previous'
  | 'refresh'
  | 'search'
  | 'sort-ascending'
  | 'sort-descending'
  | 'sort-indeterminate'
  | 'success'
  | 'upload-file'
  | 'upload-folder'
  | 'vertical-kebab'
  | 'warning';

type ComponentIcons<Keys extends string> = {
  [Key in Keys]?: React.ReactNode;
};

export type IconsContextInterface = {
  accordion?: ComponentIcons<'more'>;
  alert?: ComponentIcons<'close' | 'info' | 'error' | 'success' | 'warning'>;
  avatar?: ComponentIcons<'user'>;
  aiConversation?: ComponentIcons<
    'attach' | 'close' | 'send' | 'remove' | 'assistant' | 'user'
  >;
  checkbox?: ComponentIcons<'indeterminate' | 'checked'>;
  field?: ComponentIcons<'clear'>;
  menu?: ComponentIcons<'menu'>;
  message?: ComponentIcons<'close' | 'info' | 'error' | 'success' | 'warning'>;
  pagination?: ComponentIcons<'previous' | 'next'>;
  passwordField?: ComponentIcons<'visibility' | 'visibilityOff'>;
  rating?: ComponentIcons<'filled' | 'empty'>;
  searchField?: ComponentIcons<'search'>;
  select?: ComponentIcons<'expand'>;
  stepperField?: ComponentIcons<'add' | 'remove'>;
  storageBrowser?: ComponentIcons<StorageBrowserIconType>;
  storageManager?: ComponentIcons<
    'upload' | 'remove' | 'error' | 'success' | 'file'
  >;
};

export const IconsContext = React.createContext<
  IconsContextInterface | undefined
>({});
