import React from 'react';
import { PaginateControl } from '../../views/Controls/Paginate';
import {
  EmptyMessageControl,
  LoadingControl,
  MessageControl,
} from '../Controls';
import { ViewElement } from '../../context/elements';
import { displayText } from '../../displayText/en';
import { useDestinationPicker } from './CopyView/useDestinationPicker';
import { CLASS_BASE } from '../constants';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import {
  getDestinationListFullPrefix,
  getDestinationPickerTableData,
} from './utils/getDestinationPickerDataTable';
import { ControlsContext } from '../../controls/types';
import { Breadcrumb } from '../../components/BreadcrumbNavigation';
import { DescriptionList } from '../../components/DescriptionList';
const {
  actionSetDestination,
  actionDestinationPickerCurrentFolderSelected,
  actionDestinationPickerNoMoreFolders,
  actionDestinationPickerDefaultError,
} = displayText;

const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

// @TODO for DestinationPicker
// DONE Implement sorting when new table is ready
// DONE - Make the ListObjects call exhaustive up to 10k results (similar to search) to fix pagination
// DONE Hide destination picker on start
// DONE Disable the destination breadcrumbs on start
// DONE Show empty message when empty table (use new table?)
// DONE add icon element
// 1. Fix styling so that it only takes up 50% of parent container
// 2. swap out custom hook for useData hook / error handling

export const DestinationPicker = ({
  destinationList,
  onSetDestinationList,
}: {
  destinationList: string[];
  onSetDestinationList: (destination: string[]) => void;
}): React.JSX.Element => {
  const {
    items,
    hasNextToken,
    currentPage,
    isLoading,
    hasError,
    handleNext,
    handlePrevious,
    range,
  } = useDestinationPicker({ destinationList });

  const handleNavigateFolder = (key: string) => {
    const newPath = [...destinationList, key.replace('/', '')];
    onSetDestinationList(newPath);
  };

  const handleNavigatePath = (index: number) => {
    const newPath = destinationList.slice(0, index + 1);
    onSetDestinationList(newPath);
  };

  const pageItems = React.useMemo(() => {
    const [start, end] = range;
    return items.slice(start, end);
  }, [range, items]);

  const disableNext =
    !hasNextToken && currentPage * DEFAULT_PAGE_SIZE > items.length;
  const disablePrevious = currentPage === 1;

  const tableData = getDestinationPickerTableData({
    items: pageItems,
    handleNavigateFolder,
  });

  const contextValue: ControlsContext = {
    data: {
      tableData,
    },
  };

  const noSubfolders = !items.length;
  const messageVariant = noSubfolders ? 'info' : 'error';
  const message = noSubfolders
    ? `${actionDestinationPickerCurrentFolderSelected} ${getDestinationListFullPrefix(
        destinationList
      )}. ${actionDestinationPickerNoMoreFolders}`
    : actionDestinationPickerDefaultError;
  const showMessage = !isLoading && (noSubfolders || hasError);

  return (
    <ControlsContextProvider {...contextValue}>
      {/* <ViewElement className={`${CLASS_BASE}__copy-destination-picker`}> */}
      <ViewElement className={`${CLASS_BASE}__action-destination`}>
        <DescriptionList
          descriptions={[
            {
              term: `${actionSetDestination}:`,
              details: destinationList.length ? (
                <>
                  {destinationList.map((item, index) => (
                    <Breadcrumb
                      isCurrent={index === destinationList.length - 1}
                      key={`${item}-${index}`}
                      onNavigate={() => handleNavigatePath(index)}
                      name={item.replace('/', '')}
                    />
                  ))}
                </>
              ) : (
                '-'
              ),
            },
          ]}
        />
        <PaginateControl
          currentPage={currentPage}
          disableNext={disableNext}
          disablePrevious={disablePrevious}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </ViewElement>
      {/* <ViewElement
          className={`${CLASS_BASE}__action-destination`}
          style={{ display: 'flex' }}
        ></ViewElement> */}
      <ViewElement className="storage-browser__table-wrapper">
        <DataTableControl className={`${CLASS_BASE}__table`} />
        {noSubfolders && <EmptyMessageControl>{message}</EmptyMessageControl>}
        {showMessage && !noSubfolders && (
          <MessageControl variant={messageVariant}>{message}</MessageControl>
        )}
        {isLoading && <LoadingControl />}
      </ViewElement>
      {/* </ViewElement> */}
    </ControlsContextProvider>
  );
};
