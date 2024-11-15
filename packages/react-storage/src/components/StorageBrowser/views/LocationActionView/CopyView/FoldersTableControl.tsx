import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { FolderData } from '../../../actions';
import { ControlsContextProvider } from '../../../controls/context';
import { DataTableControl } from '../../../controls/DataTableControl';

import { getDestinationPickerTableData } from './utils';

export interface FoldersTableProps {
  folders?: FolderData[];
  isProcessing?: boolean;
  onSelect?: (value: string) => void;
}

const defaultValue: FoldersTableProps = {};
export const { useFoldersTable, FoldersTableProvider } = createContextUtilities(
  { contextName: 'FoldersTable', defaultValue }
);

export const FoldersTableControl = (): React.JSX.Element => {
  const { folders, isProcessing, onSelect } = useFoldersTable();

  const tableData = getDestinationPickerTableData({
    folders,
    isLoading: !!isProcessing,
    onSelect,
  });

  return (
    <ControlsContextProvider data={{ tableData }}>
      <DataTableControl />
    </ControlsContextProvider>
  );
};

FoldersTableControl.displayName = 'FoldersTable';
