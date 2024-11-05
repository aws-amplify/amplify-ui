import React from 'react';
import { resolveClassName } from '../utils';
import { CLASS_BASE } from '../constants';
import { useAction } from '../../do-not-import-from-here/actions';
import { useStore } from '../../providers/store';
import { Controls } from '../Controls';
import { NavigationControl } from '../../controls/NavigationControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { ControlsContextProvider } from '../../controls/context';
import { ActionsMenuControl } from './Controls/ActionsMenu';
import { useLocationDetailView } from './useLocationDetailView';
import { LocationDetailViewProps } from './types';
import { getLocationDetailViewTableData } from './getLocationDetailViewTableData';
import { DropZoneControl } from '../../controls/DropZoneControl';
import { ViewElement } from '../../context/elements';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

const {
  EmptyMessage,
  Loading: LoadingControl,
  Message,
  Paginate,
  Title: TitleControl,
} = Controls;

export const Title = (): React.JSX.Element => {
  const [{ location }] = useStore();
  const { current, key } = location;
  const { bucket, prefix } = current ?? {};

  return <TitleControl>{prefix ? key : bucket}</TitleControl>;
};

function Loading({ show }: { show?: boolean }) {
  return show ? <LoadingControl /> : null;
}

export const LocationDetailMessage = (): React.JSX.Element | null => {
  const [{ hasError, message }] = useAction('LIST_LOCATION_ITEMS');

  return hasError ? (
    <Message variant="error">{message ?? DEFAULT_ERROR_MESSAGE}</Message>
  ) : null;
};

const LocationDetailEmptyMessage = () => {
  const [{ data, hasError, isLoading }] = useAction('LIST_LOCATION_ITEMS');
  const shouldShowEmptyMessage =
    data.result.length === 0 && !isLoading && !hasError;

  return shouldShowEmptyMessage ? (
    <EmptyMessage>No items to show.</EmptyMessage>
  ) : null;
};

export function LocationDetailView({
  className,
  onActionSelect,
  onExit,
  onNavigate: onNavigateProp,
}: LocationDetailViewProps): React.JSX.Element {
  const {
    page,
    pageItems,
    isLoading,
    isPaginatePreviousDisabled,
    isPaginateNextDisabled,
    currentLocation,
    currentPath,
    areAllFilesSelected,
    fileDataItems,
    hasFiles,
    hasError,
    onDropFiles,
    onRefresh,
    onPaginateNext,
    onPaginatePrevious,
    onDownload,
    onNavigate,
    onNavigateHome,
    onSelect,
    onSelectAll,
  } = useLocationDetailView({ onNavigate: onNavigateProp, onExit });

  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATION_DETAIL_VIEW"
    >
      <ControlsContextProvider
        data={{
          isDataRefreshDisabled: isLoading,
          currentLocation,
          currentPath,
          tableData: getLocationDetailViewTableData({
            areAllFilesSelected,
            currentLocation,
            currentPath,
            fileDataItems,
            hasFiles,
            pageItems,
            onDownload,
            onNavigate,
            onSelect,
            onSelectAll,
          }),
        }}
        onDropFiles={onDropFiles}
        onNavigate={onNavigate}
        onNavigateHome={onNavigateHome}
        onRefresh={onRefresh}
      >
        <NavigationControl
          className={`${CLASS_BASE}__location-detail-view-navigation`}
        />
        <Title />
        <ViewElement className={`${CLASS_BASE}__location-detail-view-controls`}>
          <Paginate
            currentPage={page}
            disableNext={isPaginateNextDisabled}
            disablePrevious={isPaginatePreviousDisabled}
            handleNext={onPaginateNext}
            handlePrevious={onPaginatePrevious}
          />
          <DataRefreshControl
            className={`${CLASS_BASE}__locations-detail-view-data-refresh`}
          />
          <ActionsMenuControl
            onActionSelect={onActionSelect}
            disabled={isLoading}
          />
        </ViewElement>
        <LocationDetailMessage />
        <Loading show={isLoading} />
        {hasError ? null : (
          <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
            <DropZoneControl
              className={`${CLASS_BASE}__location-detail-view-drop-zone`}
            >
              <DataTableControl
                className={`${CLASS_BASE}__location-detail-view-data-table`}
              />
            </DropZoneControl>
          </ViewElement>
        )}
        <LocationDetailEmptyMessage />
      </ControlsContextProvider>
    </div>
  );
}
