import { WithKey } from '../../../components/types';
import { DataTableProps } from '../../../composables/DataTable';
import { LocationData } from '../../../actions';
import { LocationItemData } from '../../../../../../dist/types/components/StorageBrowser/actions';
import { getFileRowContent } from './getFileRowContent';
import { getFolderRowContent } from './getFolderRowContent';
import { displayText } from '../../../displayText/en';
import { FileData } from '../../../actions/handlers';

type HeaderKeys =
  | 'checkbox'
  | 'name'
  | 'type'
  | 'last-modified'
  | 'size'
  | 'download';

export const LOCATION_DETAIL_VIEW_HEADERS: WithKey<
  DataTableProps['headers'][number],
  HeaderKeys
>[] = [
  { key: 'checkbox', type: 'text', content: { text: '' } },
  { key: 'name', type: 'sort', content: { label: 'Name' } },
  { key: 'type', type: 'sort', content: { label: 'Type' } },
  { key: 'last-modified', type: 'sort', content: { label: 'Last Modified' } },
  { key: 'size', type: 'sort', content: { label: 'Size' } },
  { key: 'download', type: 'text', content: { text: '' } },
];

export const getLocationDetailViewTableData = ({
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
}: {
  areAllFilesSelected: boolean;
  currentLocation?: LocationData;
  currentPath: string;
  fileDataItems?: FileData[];
  hasFiles: boolean;
  pageItems: LocationItemData[];
  onDownload: (fileItem: FileData) => void;
  onNavigate: (location: LocationData, path?: string) => void;
  onSelect: (isSelected: boolean, fileItem: FileData) => void;
  onSelectAll: () => void;
}): DataTableProps => {
  const headerCheckbox: DataTableProps['headers'][number] = {
    key: 'checkbox',
    type: 'checkbox',
    content: {
      checked: areAllFilesSelected,
      label: displayText.locationDetailSelectAllFiles,
      onSelect: onSelectAll,
    },
  };

  const headers = hasFiles
    ? [headerCheckbox, ...LOCATION_DETAIL_VIEW_HEADERS.slice(1)]
    : LOCATION_DETAIL_VIEW_HEADERS;

  const rows: DataTableProps['rows'] = pageItems.map((locationItem) => {
    const { id, key, type } = locationItem;
    switch (type) {
      case 'FILE': {
        const { lastModified, size } = locationItem;
        const isSelected =
          fileDataItems?.some((item) => item.id === id) ?? false;
        const onFileDownload = () => {
          onDownload(locationItem);
        };
        const onFileSelect = () => {
          onSelect(isSelected, locationItem);
        };
        return {
          key: id,
          content: getFileRowContent({
            currentLocation,
            currentPath,
            isSelected,
            lastModified,
            rowId: id,
            rowKey: key,
            size,
            onDownload: onFileDownload,
            onSelect: onFileSelect,
          }),
        };
      }
      case 'FOLDER': {
        const itemSubPath = key.slice(
          `${currentLocation?.prefix ?? ''}${currentPath}`.length
        );
        const itemLocationPath = key.slice(currentLocation?.prefix.length);
        const onFolderNavigate = () => {
          if (!currentLocation) {
            return;
          }
          onNavigate({ ...currentLocation, id }, itemLocationPath);
        };
        return {
          key: id,
          content: getFolderRowContent({
            itemSubPath,
            rowId: id,
            onNavigate: onFolderNavigate,
          }),
        };
      }
    }
  });

  return { headers, rows };
};
