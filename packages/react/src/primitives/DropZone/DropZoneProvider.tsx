import * as React from 'react';
import { DragState } from './types';

const DropZoneContext = React.createContext<DragState>('none');

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
