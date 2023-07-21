import * as React from 'react';
import { IconContext, IconContextInterface } from './IconContext';

interface IconProviderProps {
  children: React.ReactNode;
  icons?: IconContextInterface;
}

export { IconContextInterface };

export function IconProvider({
  children,
  icons,
}: IconProviderProps): JSX.Element {
  return <IconContext.Provider value={icons}>{children}</IconContext.Provider>;
}
