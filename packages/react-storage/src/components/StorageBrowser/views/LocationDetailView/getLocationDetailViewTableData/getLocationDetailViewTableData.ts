import type {
  FileData,
  FileDataItem,
  LocationData,
  LocationItemData,
} from '../../../actions';
import { createFileDataItem } from '../../../actions';
import type { DataTableProps } from '../../../components';
import type { DefaultLocationDetailViewDisplayText } from '../../../displayText/types';
import type { LocationState } from '../../../store';

import { getFileRowContent } from './getFileRowContent';
import { getFolderRowContent } from './getFolderRowContent';
import { getHeaders } from './getHeaders';

export const getLocationDetailViewTableData = ({
  filePreviewEnabled,
  activeFile,
  onSelectActiveFile,
  areAllFilesSelected,
  displayText,
  location,
  fileDataItems,
  hasFiles,
  pageItems,
  selectFileLabel,
  selectAllFilesLabel,
  getDateDisplayValue,
  onDownload,
  onNavigate,
  onSelect,
  onSelectAll,
}: {
  filePreviewEnabled: boolean;
  activeFile: FileData | undefined;
  onSelectActiveFile: (arg: FileData) => void;
  areAllFilesSelected: boolean;
  displayText: DefaultLocationDetailViewDisplayText;
  location: LocationState;
  fileDataItems?: FileData[];
  hasFiles: boolean;
  pageItems: LocationItemData[];
  selectFileLabel: string;
  selectAllFilesLabel: string;
  getDateDisplayValue: (date: Date) => string;
  onDownload: (fileItem: FileDataItem) => void;
  onNavigate: (location: LocationData, path?: string) => void;
  onSelect: (isSelected: boolean, fileItem: FileData) => void;
  onSelectAll: () => void;
}): DataTableProps => {
  const {
    tableColumnLastModifiedHeader,
    tableColumnNameHeader,
    tableColumnSizeHeader,
    tableColumnTypeHeader,
  } = displayText;
  const headers = getHeaders({
    areAllFilesSelected,
    selectAllFilesLabel,
    hasFiles,
    onSelectAll,
    tableColumnLastModifiedHeader,
    tableColumnNameHeader,
    tableColumnSizeHeader,
    tableColumnTypeHeader,
  });

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

        const onClick = () => {
          onSelectActiveFile(locationItem);
        };

        return {
          key: id,
          active: activeFile?.id === id,
          content: getFileRowContent({
            filePreviewEnabled,
            permissions: current?.permissions ?? [],
            isSelected,
            itemLocationKey: `${current?.prefix ?? ''}${path}`,
            lastModified,
            getDateDisplayValue,
            rowId: id,
            rowKey: key,
            selectFileLabel,
            size,
            onDownload: onFileDownload,
            onSelect: onFileSelect,
            onClick,
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
          active: false,
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
