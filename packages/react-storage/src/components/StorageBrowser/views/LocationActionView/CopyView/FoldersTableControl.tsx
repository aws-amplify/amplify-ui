import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { FolderData } from '../../../actions';
import { ControlsContextProvider } from '../../../controls/context';
import { DataTableControl } from '../../../controls/DataTableControl';

import { getDestinationPickerTableData } from './getDestinationPickerTableData';
import { LocationState } from '../../../providers/store/location';

export interface FoldersTableProps {
  destination?: LocationState;
  folders?: FolderData[];
  onSelectFolder?: (id: string, folderLocationPath: string) => void;
}

const defaultValue: FoldersTableProps = {};
export const { useFoldersTable, FoldersTableProvider } = createContextUtilities(
  { contextName: 'FoldersTable', defaultValue }
);

export const FoldersTableControl = (): React.JSX.Element => {
  const { destination, folders, onSelectFolder } = useFoldersTable();

  const { current, path = '' } = destination ?? {};

  const tableData = getDestinationPickerTableData({
    prefix: current?.prefix ?? '',
    path,
    folders,
    onSelectFolder,
  });

  return (
    <ControlsContextProvider data={{ tableData }}>
      <DataTableControl />
    </ControlsContextProvider>
  );
};

FoldersTableControl.displayName = 'FoldersTable';
