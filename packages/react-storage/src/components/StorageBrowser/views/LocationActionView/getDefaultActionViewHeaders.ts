import { ActionViewHeaders } from './types';
import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from '../../displayText/libraries/en/shared';

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
  displayText: typeof DEFAULT_ACTION_VIEW_DISPLAY_TEXT;
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
