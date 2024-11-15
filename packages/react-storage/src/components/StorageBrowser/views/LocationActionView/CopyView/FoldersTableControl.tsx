import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { FolderData } from '../../../actions';
import { ControlsContextProvider } from '../../../controls/context';
import { DataTableControl } from '../../../controls/DataTableControl';

import { getDestinationPickerTableData } from './utils';

export interface FoldersTableProps {
  folders?: FolderData[];
  onSelect?: (value: string) => void;
}

const defaultValue: FoldersTableProps = {};
export const { useFoldersTable, FoldersTableProvider } = createContextUtilities(
  { contextName: 'FoldersTable', defaultValue }
);

export const FoldersTableControl = (): React.JSX.Element => {
  const { folders, onSelect } = useFoldersTable();

  const tableData = getDestinationPickerTableData({
    folders,
    onSelect,
  });

  return (
    <ControlsContextProvider data={{ tableData }}>
      <DataTableControl />
    </ControlsContextProvider>
  );
};

FoldersTableControl.displayName = 'FoldersTable';
