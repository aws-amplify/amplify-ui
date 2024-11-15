import { ActionViewHeaders } from './types';
import { DefaultActionViewDisplayText } from '../../displayText/types';

export const getDefaultActionViewHeaders = ({
  displayText: {
    tableColumnNameHeader,
    tableColumnTypeHeader,
    tableColumnSizeHeader,
    tableColumnStatusHeader,
    tableColumnCancelHeader,
    tableColumnFolderHeader,
  },
}: {
  displayText: DefaultActionViewDisplayText;
}): ActionViewHeaders => {
  return [
    {
      key: 'name',
      type: 'sort',
      content: { label: tableColumnNameHeader },
    },
    {
      key: 'folder',
      type: 'sort',
      content: { label: tableColumnFolderHeader },
    },
    { key: 'type', type: 'sort', content: { label: tableColumnTypeHeader } },
    { key: 'size', type: 'sort', content: { label: tableColumnSizeHeader } },
    {
      key: 'status',
      type: 'sort',
      content: { label: tableColumnStatusHeader },
    },
    { key: 'cancel', type: 'text', content: { text: tableColumnCancelHeader } },
  ];
};
