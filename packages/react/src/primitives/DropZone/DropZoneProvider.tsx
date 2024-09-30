import * as React from 'react';

type DragState = 'accept' | 'reject' | 'inactive';

const DropZoneContext = React.createContext<DragState>('inactive');

const DropZoneProvider = ({
  value,
  children,
}: {
  value: DragState;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <DropZoneContext.Provider value={value}>
      {children}
    </DropZoneContext.Provider>
  );
};

export { DropZoneProvider, DropZoneContext };
