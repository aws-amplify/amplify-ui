import * as React from 'react';
import { DragStates } from './types';

const DropZoneContext = React.createContext<DragStates>({
  isDragAccept: false,
  isDragReject: false,
  isDragActive: false,
});

const DropZoneProvider = ({
  value,
  children,
}: {
  value: DragStates;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <DropZoneContext.Provider value={value}>
      {children}
    </DropZoneContext.Provider>
  );
};

export { DropZoneProvider, DropZoneContext };
