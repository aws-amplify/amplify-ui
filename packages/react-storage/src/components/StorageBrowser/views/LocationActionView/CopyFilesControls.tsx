import React from 'react';

import { ButtonElement, ViewElement } from '../../context/elements';

import { Controls, NavigateItem } from '../Controls';

import { Title } from './Controls/Title';
import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { useCopyActionView } from './hooks/useCopyActionView';
import { HeadingControl } from '../Controls/Heading';
import { Column } from '../Controls/Table';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import { getDeleteActionViewTableData } from './utils';
import { useStore } from '../../providers/store';
import { ControlsContext } from '../../controls/types';

const RESULT_COMPLETE_MESSAGE = 'File copied';
const RESULT_FAILED_MESSAGE = 'There was an issue copying the files.';

const { Exit, Primary } = Controls;
const { actionSetDestination, actionSelectedText } = displayText;

interface SelectedFilesColumns {
  key: string;
  folder: string;
  type: string;
  size: string;
  status: string;
  action: undefined | (() => void);
}

const SELECTED_FILES_COLUMNS: Column<SelectedFilesColumns>[] = [
  { key: 'key', header: 'Name' },
  { key: 'folder', header: 'Folder' },
  { key: 'type', header: 'Type' },
  { key: 'size', header: 'Size' },
  { key: 'status', header: 'Status' },
  { key: 'action', header: '' },
];

// @TODO for CopyFilesControls
// 1. Implement default sort when new table is ready
// 2. Fix styling so that list only takes up 50% of parent container
// 3. Fix useProcessTasks so that canceling a non-queued item actually works

export const CopyFilesControls = ({
  onClose: _onClose,
}: {
  onClose?: () => void;
}): React.JSX.Element => {
  const {
    destinationList,
    onSetDestinationList,
    disableCancel,
    disableClose,
    disablePrimary,
    onClose,
    onCancel,
    onStart,
    taskCounts,
    tasks,
  } = useCopyActionView({ onClose: _onClose });

  const [{ history }] = useStore();
  const { current } = history;
  const path = current?.prefix;
  const tableData = getDeleteActionViewTableData({
    tasks,
    taskCounts,
    path: path ?? '',
  });

  const contextValue: ControlsContext = {
    data: { taskCounts, tableData },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
  };

  const handleNavigatePath = (index: number) => {
    const newPath = destinationList.slice(0, index + 1);
    onSetDestinationList(newPath);
  };

  // const selectedItemsData = tasks.map((item) => {
  //   return {
  //     ...item,
  //     folder: path,
  //     type: item.key.slice(item.key.lastIndexOf('.') + 1) || '-',
  //     action: isProcessing ? item.cancel : item.remove,
  //     // @ts-ignore
  //     // FIXME: task type doesn't have size property, but the object does have it
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     size: item.size,
  //   };
  // });

  // const renderHeaderItem = React.useCallback(
  //   (column: Column<SelectedFilesColumns>) => {
  //     const { header, key } = column;
  //     return (
  //       <Table.TableHeader key={header} variant={key}>
  //         {column.header}
  //       </Table.TableHeader>
  //     );
  //   },
  //   []
  // );

  // const renderRowItem: RenderRowItem<SelectedFilesColumns> = (row, index) => {
  //   const renderTableData = (
  //     columnKey: keyof SelectedFilesColumns,
  //     row: SelectedFilesColumns
  //   ) => {
  //     switch (columnKey) {
  //       case 'key': {
  //         return <TableDataText>{row.key}</TableDataText>;
  //       }
  //       case 'folder': {
  //         return <TableDataText>{row.folder}</TableDataText>;
  //       }
  //       case 'type': {
  //         const indexOfDot = row.key.lastIndexOf('.');

  //         return indexOfDot > -1 ? (
  //           <TableDataText>{row.key.slice(indexOfDot + 1)}</TableDataText>
  //         ) : (
  //           '-'
  //         );
  //       }
  //       case 'size':
  //         return (
  //           <TableDataText>
  //             {humanFileSize(parseInt(row.size), true)}
  //           </TableDataText>
  //         );
  //       case 'status':
  //         return (
  //           <TableDataText>
  //             {STATUS_DISPLAY_VALUES[row.status as keyof {}]}
  //           </TableDataText>
  //         );
  //       // case 'progress':
  //       //   return (
  //       //     <TableDataText>{`${getPercentValue(row.progress)}%`}</TableDataText>
  //       //   );
  //       case 'action':
  //         if (row.action && tasks.length > 1) {
  //           return isProcessing ? (
  //             <CancelControl
  //               onClick={() => row.action?.()}
  //               ariaLabel={`Cancel copy item: ${row.key}`}
  //             />
  //           ) : (
  //             <CancelControl
  //               onClick={() => row.action?.()}
  //               ariaLabel={`Remove copy item: ${row.key}`}
  //             />
  //           );
  //         }

  //         return null;
  //       default:
  //         return null;
  //     }
  //   };

  //   return (
  //     <Table.TableRow key={index}>
  //       {SELECTED_FILES_COLUMNS.map((column) => {
  //         return (
  //           <Table.TableData
  //             key={`${index}-${column.header}`}
  //             variant={column.key}
  //           >
  //             {renderTableData(column.key, row)}
  //           </Table.TableData>
  //         );
  //       })}
  //     </Table.TableRow>
  //   );
  // };

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit disabled={disableClose} onClick={onClose} />
      <Title />
      <ViewElement className={`${CLASS_BASE}__copy-destination`}>
        <div className="storage-browser__table" style={{ display: 'flex' }}>
          {actionSetDestination}
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
      {/* {!isProcessing && ( */}
      <DestinationPicker
        destinationPrefix={destinationList}
        setDestinationPrefix={onSetDestinationList}
      />
      {/* )} */}

      <div className="storage-browser__table">
        <HeadingControl level={3}>{actionSelectedText}</HeadingControl>
        <DataTableControl className={`${CLASS_BASE}__table`} />
      </div>
      <Primary
        disabled={disablePrimary}
        onClick={() => {
          onStart();
        }}
      >
        Start
      </Primary>
      <ButtonElement
        variant="cancel"
        disabled={disableCancel}
        className={`${CLASS_BASE}__cancel`}
        onClick={() => onCancel()}
      >
        Cancel
      </ButtonElement>
    </ControlsContextProvider>
  );
};
