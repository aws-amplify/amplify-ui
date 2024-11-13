import { DataTableProps } from '../../../composables/DataTable';
import { LocationData } from '../../../actions';
import {
  createFileDataItem,
  FileDataItem,
  LocationItemData,
} from '../../../actions/handlers';
import { getFileRowContent } from './getFileRowContent';
import { getFolderRowContent } from './getFolderRowContent';
import { displayText } from '../../../displayText/en';
import { FileData } from '../../../actions/handlers';

import { LOCATION_DETAIL_VIEW_HEADERS } from './constants';
import { LocationState } from '../../../providers/store/location';

export const getLocationDetailViewTableData = ({
  areAllFilesSelected,
  location,
  fileDataItems,
  hasFiles,
  pageItems,
  onDownload,
  onNavigate,
  onSelect,
  onSelectAll,
}: {
  areAllFilesSelected: boolean;
  location: LocationState;
  fileDataItems?: FileData[];
  hasFiles: boolean;
  pageItems: LocationItemData[];
  onDownload: (fileItem: FileDataItem) => void;
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
        const { current, path } = location;
        const isSelected =
          fileDataItems?.some((item) => item.id === id) ?? false;
        const onFileDownload = () => {
          onDownload(createFileDataItem(locationItem));
        };
        const onFileSelect = () => {
          onSelect(isSelected, locationItem);
        };
        return {
          key: id,
          content: getFileRowContent({
            isSelected,
            itemLocationKey: `${current?.prefix ?? ''}${path}`,
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
        const { current, path } = location;
        const itemSubPath = key.slice(`${current?.prefix ?? ''}${path}`.length);
        const itemLocationPath = key.slice(current?.prefix.length);
        const onFolderNavigate = () => {
          if (!current) {
            return;
          }
          onNavigate({ ...current, id }, itemLocationPath);
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
