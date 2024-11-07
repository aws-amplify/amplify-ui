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
import { SearchControl } from '../../controls/SearchControl';
const {
  actionDestinationPickerCurrentFolderSelected,
  actionDestinationPickerNoMoreFolders,
  actionDestinationPickerDefaultError,
} = displayText;

const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

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
    onSearch,
    range,
  } = useDestinationPicker({ destinationList });

  const handleNavigateFolder = (key: string) => {
    const newPath = [...destinationList, key.replace('/', '')];
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
      showIncludeSubfolders: false,
      searchPlaceholder: displayText.filterCopyPlaceholder,
    },
    onSearch,
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
      <ViewElement className={`amplify-${CLASS_BASE}__action__options`}>
        <SearchControl />
        <PaginateControl
          currentPage={currentPage}
          disableNext={disableNext}
          disablePrevious={disablePrevious}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </ViewElement>
      <ViewElement className={`amplify-${CLASS_BASE}__table__wrapper`}>
        <DataTableControl />
        {noSubfolders && <EmptyMessageControl>{message}</EmptyMessageControl>}
        {showMessage && !noSubfolders && (
          <MessageControl variant={messageVariant}>{message}</MessageControl>
        )}
        {isLoading && <LoadingControl />}
      </ViewElement>
    </ControlsContextProvider>
  );
};
