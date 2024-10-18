import React from 'react';

import { ButtonElement, ViewElement } from '../../context/elements';

import { Controls, NavigateItem } from '../Controls';

import { Title } from './Controls/Title';
import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { useCopyActionView } from '../hooks/useCopyActionView';
import { HeadingControl } from '../Controls/Heading';
import { Column, RenderRowItem, TableDataText } from '../Controls/Table';
import { STATUS_DISPLAY_VALUES } from './constants';


const RESULT_COMPLETE_MESSAGE = 'File copied';
const RESULT_FAILED_MESSAGE = 'There was an issue copying the files.';


const { Exit, Primary, Table } = Controls;
const { actionDestination, actionSelectedText } = displayText;

interface SelectedFilesColumns {
  key: string;
  folder: string;
  type: string;
  // size: string;
  // action: string;
  status: string;
}

const SELECTED_FILES_COLUMNS: Column<SelectedFilesColumns>[] = [
  { key: 'key', header: 'Name' },
  // { key: 'folder', header: 'Folder' },
  { key: 'type', header: 'Type' },
  { key: 'status', header: 'Status' },
];




export const CopyFilesControls = (): React.JSX.Element => {
  const { path, tasks, onClose, onCancel, onStart, destinationList, isProcessing, onSetDestinationList } =
    useCopyActionView();

  // const key = selected && selected?.items?.[0].key;
  const disableCancel = false;

  const primaryProps =
  {
    onClick: () => {
      onStart();
    },
    children: 'Copy',
    disabled: isProcessing,
  };

  const handleNavigatePath = (index: number) => {
    const newPath = destinationList.slice(0, index + 1);
    onSetDestinationList(newPath);
  };

  const selectedItemsData = tasks.map((item) => {
    return { ...item, folder: path ?? '', type: item.key.slice(item.key.lastIndexOf('.') + 1) || '-' };
  });

  const renderHeaderItem = React.useCallback(
    (column: Column<SelectedFilesColumns>) => {
      const { header, key } = column;
      return (
        <Table.TableHeader
          key={header}
          variant={key}
        >
          {column.header}
        </Table.TableHeader>
      );
    },
    []
  );

  const renderRowItem: RenderRowItem<SelectedFilesColumns> = (row, index) => {
    const renderTableData = (
      columnKey: keyof SelectedFilesColumns,
      row: SelectedFilesColumns
    ) => {
      switch (columnKey) {
        case 'key': {
          return (
            <TableDataText>
              {row.key}
            </TableDataText>
          );
        }
        case 'folder': {
          return <TableDataText>{row.folder}</TableDataText>;
        }
        case 'type': {
          const indexOfDot = row.key.lastIndexOf('.');

          return indexOfDot > -1 ? (
            <TableDataText>{row.key.slice(indexOfDot + 1)}</TableDataText>
          ) : (
            '-'
          );
        }
        // case 'size':
        //   return (
        //     <TableDataText>
        //       {humanFileSize(parseInt(row.size), true)}
        //     </TableDataText>
        //   );
        case 'status':
          return (
            <TableDataText>{STATUS_DISPLAY_VALUES[row.status as keyof {}]}</TableDataText>
          );
          // case 'progress':
          //   return (
          //     <TableDataText>{`${getPercentValue(row.progress)}%`}</TableDataText>
          //   );
          // case 'action':
          //   if (row.cancel) {
          //     return (
          //       <Cancel
          //         onClick={row.cancel}
          //         ariaLabel={`Cancel upload for ${row.key}`}
          //       />
          //     );
          //   }

          return null;
        default:
          return null;
      }
    };

    return (
      <Table.TableRow key={index}>
        {SELECTED_FILES_COLUMNS.map((column) => {
          return (
            <Table.TableData
              key={`${index}-${column.header}`}
              variant={column.key}
            >
              {renderTableData(column.key, row)}
            </Table.TableData>
          );
        })}
      </Table.TableRow>
    );
  };


  return (
    <>
      <Exit
        onClick={onClose}
      />
      <Title />
      <ViewElement className={`${CLASS_BASE}__copy-destination`}>
        <div className="storage-browser__table" style={{ display: 'flex' }}>
          {actionDestination}
          {destinationList.length ? (
            <>
              {destinationList.map((item, index) => (
                <NavigateItem
                  isCurrent={index === destinationList.length - 1}
                  key={`${item}-${index}`}
                  onClick={() => handleNavigatePath(index)}
                >
                  {item?.replace('/', '')}
                </NavigateItem>
              ))}
            </>
          ) : (
            '-'
          )}
        </div>
      </ViewElement>
      <Primary {...primaryProps} />
      <ButtonElement
        variant="cancel"
        disabled={disableCancel}
        className={`${CLASS_BASE}__cancel`}
        onClick={onCancel}
      >
        Cancel
      </ButtonElement>
      <DestinationPicker
        destinationPrefix={destinationList}
        setDestinationPrefix={onSetDestinationList}
      />
      <div className="storage-browser__table">
        <HeadingControl>{actionSelectedText}</HeadingControl>
        <Table
          data={selectedItemsData}
          columns={SELECTED_FILES_COLUMNS}
          renderHeaderItem={renderHeaderItem}
          renderRowItem={renderRowItem}
        />
      </div>
    </>
  );
};
