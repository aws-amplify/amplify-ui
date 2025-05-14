import * as React from 'react';
import type { StorageBrowserIconType } from './StorageBrowserIcons';

type ComponentIcons<Keys extends string> = {
  [Key in Keys]?: React.ReactNode;
};

export type IconsContextInterface = {
  accordion?: ComponentIcons<'more'>;
  alert?: ComponentIcons<'close' | 'info' | 'error' | 'success' | 'warning'>;
  avatar?: ComponentIcons<'user'>;
  aiConversation?: ComponentIcons<
    'attach' | 'close' | 'send' | 'remove' | 'assistant' | 'user' | 'document'
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
