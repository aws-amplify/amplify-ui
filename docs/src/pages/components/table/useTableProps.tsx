import * as React from 'react';

import { TableProps } from '@aws-amplify/ui-react';

import { TablePropControlsProps } from './TablePropControls';

interface UseTableProps {
  (initialValues?: TableProps): TablePropControlsProps;
}

export const useTableProps: UseTableProps = (initialValues) => {
  const [caption, setCaption] = React.useState<TableProps['caption']>(
    initialValues.caption
  );

  const [highlightOnHover, setHighlightOnHover] = React.useState<
    TableProps['highlightOnHover']
  >(initialValues.highlightOnHover);

  const [size, setSize] = React.useState<TableProps['size']>(
    initialValues.size
  );

  const [variation, setVariation] = React.useState<TableProps['variation']>(
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
