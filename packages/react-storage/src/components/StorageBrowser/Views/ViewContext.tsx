import React from 'react';

export type ViewType = 'LOCATIONS_LIST' | 'LOCATION_ITEMS_LIST' | 'ACTION';
export const ViewTypeContext = React.createContext<ViewType | undefined>(
  undefined
);

export const useViewType = (): ViewType => {
  const context = React.useContext(ViewTypeContext);
  if (!context) {
    // TODO: error message needs to be scoped to consuming view
    throw new Error('Use me different');
  }

  return context;
};

export function ViewTypeProvider({
  children,
  type,
}: {
  children?: React.ReactNode;
  type: ViewType;
}): React.JSX.Element {
  return (
    <ViewTypeContext.Provider value={type}>{children}</ViewTypeContext.Provider>
  );
}
