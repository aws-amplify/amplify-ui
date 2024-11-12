import React from 'react';
import { PaginateControl } from '../../../views/Controls/Paginate';
import {
  EmptyMessageControl,
  LoadingControl,
  MessageControl,
} from '../../Controls';
import { ViewElement } from '../../../context/elements';
import { displayText } from '../../../displayText/en';
import { useDestinationPicker } from '../CopyView/useDestinationPicker';
import { CLASS_BASE } from '../../constants';
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
      <ViewElement className={`${CLASS_BASE}__action-destination`}>
        <SearchControl />
        <PaginateControl
          currentPage={currentPage}
          hasMorePages={hasNextToken}
          onPaginate={onPaginate}
          highestPageVisited={highestPageVisited}
        />
      </ViewElement>
      <ViewElement className="storage-browser__table-wrapper">
        <DataTableControl
          className={`${CLASS_BASE}__destination-picker-data-table`}
        />
        {noSubfolders && <EmptyMessageControl>{message}</EmptyMessageControl>}
        {showMessage && !noSubfolders && (
          <MessageControl variant={messageVariant}>{message}</MessageControl>
        )}
        {isLoading && <LoadingControl />}
      </ViewElement>
    </ControlsContextProvider>
  );
};
