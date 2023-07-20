import * as React from 'react';

type ComponentIcons<Keys extends string> = {
  [Key in Keys]?: React.ReactElement;
};

export interface IconContextInterface {
  alert?: ComponentIcons<'close' | 'info' | 'error' | 'success' | 'warning'>;
  checkbox?: ComponentIcons<'indeterminate' | 'checked'>;
  expander?: ComponentIcons<'more'>;
  field?: ComponentIcons<'clear'>;
  menu?: ComponentIcons<'menu'>;
  pagination?: ComponentIcons<'previous' | 'next'>;
  passwordField?: ComponentIcons<'visibility' | 'visibilityOff'>;
  rating?: ComponentIcons<'filled' | 'empty'>;
  searchField?: ComponentIcons<'search'>;
  select?: ComponentIcons<'expand'>;
  stepperField?: ComponentIcons<'add' | 'remove'>;
  storageManager?: ComponentIcons<
    'upload' | 'remove' | 'error' | 'success' | 'file'
  >;
}

export const IconContext = React.createContext<
  IconContextInterface | undefined
>({});
