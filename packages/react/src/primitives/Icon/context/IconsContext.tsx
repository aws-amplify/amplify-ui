import * as React from 'react';

type ComponentIcons<Keys extends string> = {
  [Key in Keys]?: React.ReactNode;
};

export type IconsContextInterface = {
  accordion?: ComponentIcons<'more'>;
  alert?: ComponentIcons<'close' | 'info' | 'error' | 'success' | 'warning'>;
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
  storageManager?: ComponentIcons<
    'upload' | 'remove' | 'error' | 'success' | 'file'
  >;
};

export const IconsContext = React.createContext<
  IconsContextInterface | undefined
>({});
