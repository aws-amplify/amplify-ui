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

  const [highlightOnHover, setHighlightOnHover] = useState<
    TableProps['highlightOnHover']
  >(initialValues.highlightOnHover);

  const [size, setSize] = useState<TableProps['size']>(initialValues.size);

  const [variation, setVariation] = useState<TableProps['variation']>(
    initialValues.variation
  );

  return {
    caption,
    highlightOnHover,
    setCaption,
    setHighlightOnHover,
    setSize,
    setVariation,
    size,
    variation,
  };
};
