import React from 'react';
import { StorageBrowserElements } from '../../context/elements';

const { Table, TableBody, TableData, TableHead, TableHeader, TableRow } =
  StorageBrowserElements;

export interface TableControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<
    T,
    | 'Table'
    | 'TableBody'
    | 'TableData'
    | 'TableHead'
    | 'TableHeader'
    | 'TableRow'
  > {
  (): React.JSX.Element;
}

export const TableControl: TableControl = () => {
  return <>Table</>;
};

TableControl.Table = Table;
TableControl.TableBody = TableBody;
TableControl.TableData = TableData;
TableControl.TableHead = TableHead;
TableControl.TableHeader = TableHeader;
TableControl.TableRow = TableRow;
