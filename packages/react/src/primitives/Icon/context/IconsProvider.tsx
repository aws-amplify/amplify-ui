import * as React from 'react';
import { IconsContext, IconsContextInterface } from './IconsContext';

interface IconProviderProps {
  children: React.ReactNode;
  icons?: IconsContextInterface;
}

export { IconsContextInterface };

export function IconsProvider({
  children,
  icons,
}: IconProviderProps): JSX.Element {
  return (
    <IconsContext.Provider value={icons}>{children}</IconsContext.Provider>
  );
}
