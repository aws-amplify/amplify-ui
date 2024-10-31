import React from 'react';
import { LoadingControl } from '../Controls/Loading';
import { PaginateControl } from '../../views/Controls/Paginate';
import { Controls } from '../Controls';
import { TableDataText, Column, RenderRowItem } from '../Controls/Table';
import { IconElement, StorageBrowserElements } from '../../context/elements';
import { displayText } from '../../displayText/en';
import { useDestinationPicker } from './hooks/useDestinationPicker';
const { actionCurrentFolderSelected } = displayText;
const { Button } = StorageBrowserElements;
const { Table } = Controls;

const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

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
// 4. Hide destination picker on start
// 5. Disable the destination breadcrumbs on start
// 6. Show empty message when empty table (use new table?)
// 7. add icon element



export const DestinationPicker = ({
  destinationPrefix,
  setDestinationPrefix,
}: {
  destinationPrefix: string[];
  setDestinationPrefix: (destination: string[]) => void;
  }): React.JSX.Element => {
  // const [{ data, isLoading }, handleList] = useAction('LIST_LOCATION_ITEMS');
  const {
    items,
    hasNextToken,
    currentPage,
    isLoading,
    handleNext,
    handlePrevious,
    range
  } = useDestinationPicker({ destinationPrefix })

  const handleNavigateFolder = (key: string) => {
    const newPath = [...destinationPrefix, key.replace('/', '')];
    console.log('newPath', newPath)
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
                  <IconElement variant='folder' />
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



  const pageItems = React.useMemo(() => {
    const [start, end] = range;
    return items.slice(start, end);
  }, [range, items]);

  const disableNext = !hasNextToken && currentPage * DEFAULT_PAGE_SIZE > items.length;
  const disablePrevious = currentPage === 1;
  const selectedItemsData = pageItems.map((item) => {
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
        handleNext={handleNext}
        handlePrevious={handlePrevious}
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
