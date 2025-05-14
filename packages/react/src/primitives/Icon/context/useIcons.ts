import * as React from 'react';
import type { IconsContextInterface } from './IconsContext';
import { IconsContext } from './IconsContext';

export function useIcons<Key extends keyof IconsContextInterface>(
  component?: Key
): IconsContextInterface[Key] | undefined {
  const context = React.useContext(IconsContext);
  if (component && context) {
    return context[component];
  }
  return undefined;
}
