import React from 'react';
import { PaginationControl } from '../../../controls/PaginationControl';
import {
  EmptyMessageControl,
  LoadingControl,
  MessageControl,
} from '../../Controls';
import { ViewElement } from '../../../context/elements';
import { displayText } from '../../../displayText/en';
import { useDestinationPicker } from '../CopyView/useDestinationPicker';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../../constants';
import { DataTableControl } from '../../../controls/DataTableControl';
import { ControlsContextProvider } from '../../../controls/context';
import { ControlsContext } from '../../../controls/types';
import { Breadcrumb } from '../../../components/BreadcrumbNavigation';
import { DescriptionList } from '../../../components/DescriptionList';
import { SearchControl } from '../../../controls/SearchControl';

import {
  getDestinationListFullPrefix,
  getDestinationPickerTableData,
} from './utils';

const {
  actionSetDestination,
  actionDestinationPickerCurrentFolderSelected,
  actionDestinationPickerNoMoreFolders,
  actionDestinationPickerDefaultError,
} = displayText;

export const DestinationPicker = ({
  destinationList,
  onDestinationChange,
}: {
  destinationList: string[];
  onDestinationChange: (destination: string[]) => void;
}): React.JSX.Element => {
  const {
    bucket,
    items,
    highestPageVisited,
    hasNextToken,
    currentPage,
    isLoading,
    hasError,
    onPaginate,
    onSearch,
    pageItems,
    searchQuery,
    onSearchQueryChange,
    onSearchClear,
    resetSearch,
  } = useDestinationPicker({ destinationList });

  const handleNavigateFolder = (key: string) => {
    const newPath = [...destinationList, key.replace('/', '')];
    onDestinationChange(newPath);
    resetSearch();
  };

  const handleNavigatePath = (index: number) => {
    const newPath = destinationList.slice(0, index + 1);
    onDestinationChange(newPath);
    resetSearch();
  };

  const tableData = getDestinationPickerTableData({
    items: pageItems,
    handleNavigateFolder,
  });

  const contextValue: ControlsContext = {
    data: {
      tableData,
      paginationData: {
        page: currentPage,
        highestPageVisited,
        hasNextPage: hasNextToken,
        onPaginate,
      },
      searchPlaceholder: displayText.filterCopyPlaceholder,
      searchQuery,
    },
    onSearch,
    onSearchQueryChange,
    onSearchClear,
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
      <DescriptionList
        descriptions={[
          {
            term: `${actionSetDestination}:`,
            details: destinationList.length ? (
              <>
                {destinationList.map((key, index) => (
                  <Breadcrumb
                    isCurrent={index === destinationList.length - 1}
                    key={`${key}-${index}`}
                    onNavigate={() => handleNavigatePath(index)}
                    // If bucket level access, show bucket name as root breadcrumb
                    name={key === '' ? bucket : key.replace('/', '')}
                  />
                ))}
              </>
            ) : (
              '-'
            ),
          },
        ]}
      />
      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__action-destination`}
      >
        <SearchControl />
        <PaginationControl
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__destination-picker-pagination`}
        />
      </ViewElement>

      <DataTableControl />
      {noSubfolders && <EmptyMessageControl>{message}</EmptyMessageControl>}
      {showMessage && !noSubfolders && (
        <MessageControl variant={messageVariant}>{message}</MessageControl>
      )}
      {isLoading && <LoadingControl />}
    </ControlsContextProvider>
  );
};
