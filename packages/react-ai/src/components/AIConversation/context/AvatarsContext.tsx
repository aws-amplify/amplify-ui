import React from 'react';
import { Avatars } from '../types';

type AvatarContextProps = Avatars | undefined;

export const AvatarsContext =
  React.createContext<AvatarContextProps>(undefined);

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