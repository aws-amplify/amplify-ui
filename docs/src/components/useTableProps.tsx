import { useState } from 'react';

import { TableProps } from '@aws-amplify/ui-react';

import { TablePropControlsProps } from './TablePropControls';

interface UseTableProps {
  (initialValues?: TableProps): TablePropControlsProps;
}

export const useTableProps: UseTableProps = (initialValues) => {
  const [caption, setCaption] = useState<TableProps['caption']>(
    initialValues.caption
  );
  const [summary, setSummary] = useState<TableProps['summary']>(
    initialValues.summary
  );

  return {
    caption,
    setCaption,
    setSummary,
    summary,
  };
};
