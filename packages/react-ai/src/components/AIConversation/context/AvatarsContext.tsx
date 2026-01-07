import React from 'react';
import type { Avatars } from '../types';

export const AvatarsContext = React.createContext<Avatars | undefined>(
  undefined
);

export const AvatarsProvider = ({
  children,
  avatars,
}: {
  children?: React.ReactNode;
  avatars?: Avatars;
}): React.JSX.Element => {
  return (
    <AvatarsContext.Provider value={avatars}>
      {children}
    </AvatarsContext.Provider>
  );
};
