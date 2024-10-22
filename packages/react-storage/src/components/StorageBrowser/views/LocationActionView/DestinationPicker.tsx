import React, { useEffect, useRef } from 'react';
import { useAction } from '../../context/actions';
import { isString } from '@aws-amplify/ui';
import { LoadingControl } from '../Controls/Loading';
import { usePaginate } from '../hooks/usePaginate';
import { PaginateControl } from '../../views/Controls/Paginate';
import { Controls } from '../Controls';
import { TableDataText, Column, RenderRowItem } from '../Controls/Table';
import { StorageBrowserElements } from '../../context/elements';
import { displayText } from '../../displayText/en';

const { actionCurrentFolderSelected } = displayText;
const { Button } = StorageBrowserElements;
const { Table } = Controls;

const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 10000;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

const DEFAULT_REFRESH_OPTIONS = { ...DEFAULT_LIST_OPTIONS, refresh: true };

interface DestinationPickerColumns {
  name: string;
}

const DESTINATION_PICKER_COLUMNS: Column<DestinationPickerColumns>[] = [
  { key: 'name', header: 'Folder name' },
];

// @TODO for DestinationPicker
// 1. Implement sorting when new table is ready
// 2. Make the ListObjects call exhaustive up to 10k results (similar to search) to fix pagination
// 3. Fix styling so that it only takes up 50% of parent container

export const DestinationPicker = ({
  destinationPrefix,
  setDestinationPrefix,
}: {
  destinationPrefix: string[];
  setDestinationPrefix: (destination: string[]) => void;
}): React.JSX.Element => {
  const previousPathref = useRef('');

  const [{ data, isLoading }, handleList] = useAction('LIST_LOCATION_ITEMS');
  const { result, nextToken } = data;

  const folderItems = result.filter((item) => item.type === 'FOLDER');
  const resultCount = folderItems.length;
  const hasNextToken = !!nextToken;

  const hasValidPath = isString(destinationPrefix);
  const onPaginateNext = () => {
    if (!hasValidPath) return;

    handleList({
      prefix: destinationPrefix,
      options: { ...DEFAULT_LIST_OPTIONS, nextToken },
    });
  };

  const { currentPage, handlePaginateNext, handlePaginatePrevious } =
    usePaginate({
      onPaginateNext,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  const disableNext = !hasNextToken;
  const disablePrevious = currentPage === 1;

  useEffect(() => {
    const newPath = destinationPrefix.join('');
    if (previousPathref.current !== newPath) {
      handleList({
        prefix: newPath,
        options: { ...DEFAULT_REFRESH_OPTIONS, nextToken },
      });
    }
    previousPathref.current = newPath;
  }, [handleList, nextToken, destinationPrefix]);

  const handleNavigateFolder = (key: string) => {
    const newPath = [...destinationPrefix, key];
    setDestinationPrefix(newPath);
  };

  const renderHeaderItem = React.useCallback(
    (column: Column<DestinationPickerColumns>) => {
      const { header, key } = column;

      return (
        <Table.TableHeader
          key={header}
          variant={key}
          // @TODO: implement sorting when new Table component is ready
          // aria-sort={selection === key ? direction : 'none'}
        >
          {column.header}
        </Table.TableHeader>
      );
    },
    []
  );

  const renderRowItem: RenderRowItem<DestinationPickerColumns> = (
    row,
    index
  ) => {
    const renderTableData = (
      columnKey: keyof DestinationPickerColumns,
      row: DestinationPickerColumns
    ) => {
      switch (columnKey) {
        case 'name': {
          return (
            <TableDataText>
              <li key={row.name} style={{ display: 'flex' }}>
                <Button
                  variant="table-data"
                  onClick={() => handleNavigateFolder(row.name)}
                >
                  {row.name}
                </Button>
              </li>
            </TableDataText>
          );
        }
        default:
          return null;
      }
    };

    return (
      <Table.TableRow key={index}>
        {row.name ? (
          DESTINATION_PICKER_COLUMNS.map((column) => {
            return (
              <Table.TableData
                key={`${index}-${column.header}`}
                variant={column.key}
              >
                {renderTableData(column.key, row)}
              </Table.TableData>
            );
          })
        ) : (
          <>{actionCurrentFolderSelected}</>
        )}
      </Table.TableRow>
    );
  };

  const selectedItemsData = folderItems.map((item) => {
    return { name: item.key, path: destinationPrefix };
  });

  if (isLoading) {
    return <LoadingControl />;
  }

  return (
    <div className="storage-browser__table">
      <PaginateControl
        currentPage={currentPage}
        disableNext={disableNext}
        disablePrevious={disablePrevious}
        handleNext={() => {
          handlePaginateNext({ resultCount, hasNextToken });
        }}
        handlePrevious={handlePaginatePrevious}
      />

      <Table
        data={selectedItemsData}
        columns={DESTINATION_PICKER_COLUMNS}
        renderHeaderItem={renderHeaderItem}
        renderRowItem={renderRowItem}
      />
    </div>
  );
};
