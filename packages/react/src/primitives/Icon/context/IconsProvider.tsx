import * as React from 'react';
import type { IconsContextInterface } from './IconsContext';
import { IconsContext } from './IconsContext';

interface IconProviderProps {
  children: React.ReactNode;
  icons?: IconsContextInterface;
}

export type { IconsContextInterface };

export function IconsProvider({
  children,
  icons,
}: IconProviderProps): React.JSX.Element {
  return (
    <IconsContext.Provider value={icons}>{children}</IconsContext.Provider>
  );
}
