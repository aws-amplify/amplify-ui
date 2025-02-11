import { LocationDetailViewHeaders } from './types';
import { DataTableCheckboxHeader } from '../../../composables/DataTable/types';

export const getHeaders = ({
  tableColumnLastModifiedHeader,
  tableColumnNameHeader,
  tableColumnSizeHeader,
  tableColumnTypeHeader,
  areAllFilesSelected,
  selectAllFilesLabel,
  onSelectAll,
  hasFiles,
}: {
  tableColumnLastModifiedHeader: string;
  tableColumnNameHeader: string;
  tableColumnSizeHeader: string;
  tableColumnTypeHeader: string;
  areAllFilesSelected: boolean;
  selectAllFilesLabel: string;
  onSelectAll: () => void;
  hasFiles: boolean;
}): LocationDetailViewHeaders => {
  const headerCheckbox: DataTableCheckboxHeader & { key: 'checkbox' } = {
    key: 'checkbox',
    type: 'checkbox',
    content: {
      checked: areAllFilesSelected,
      label: selectAllFilesLabel,
      onSelect: onSelectAll,
      id: 'header-checkbox',
    },
  };
  let headers: LocationDetailViewHeaders = [
    { key: 'checkbox', type: 'text', content: { text: '' } },
    {
      key: 'name',
      type: 'sort',
      content: { label: tableColumnNameHeader },
    },
    {
      key: 'type',
      type: 'sort',
      content: { label: tableColumnTypeHeader },
    },
    {
      key: 'last-modified',
      type: 'sort',
      content: { label: tableColumnLastModifiedHeader },
    },
    {
      key: 'size',
      type: 'sort',
      content: { label: tableColumnSizeHeader },
    },
    { key: 'download', type: 'text', content: { text: '' } },
  ];

  if (hasFiles) {
    headers = [headerCheckbox, ...headers.slice(1)];
  }

  return headers;
};
