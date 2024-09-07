import React from 'react';
import { Avatars } from '../types';

export const AvatarsContext = React.createContext<Avatars | undefined>(
  undefined
);

export const AvatarsProvider = ({
  children,
  avatars,
}: {
  children?: React.ReactNode;
  avatars?: Avatars;
}): JSX.Element => {
  return (
    <AvatarsContext.Provider value={avatars}>
      {children}
    </AvatarsContext.Provider>
  );
};
