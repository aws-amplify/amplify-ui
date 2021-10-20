import { useState } from 'react';

import { TableProps } from '@aws-amplify/ui-react';

import { TablePropControlsProps } from './TablePropControls';

interface UseTableProps {
  (initialValues?: TableProps): TablePropControlsProps;
}

export const useTableProps: UseTableProps = (initialValues) => {
  const [highlightOnHover, setHighlightOnHover] = useState<
    TableProps['highlightOnHover']
  >(initialValues.highlightOnHover);
  const [pagination, setPagination] = useState<TableProps['pagination']>(
    initialValues.pagination
  );
  const [selectable, setSelectable] = useState<TableProps['selectable']>(
    initialValues.selectable
  );
  const [size, setSize] = useState<TableProps['size']>(initialValues.size);
  const [stickyHeader, setStickyHeader] = useState<TableProps['stickyHeader']>(
    initialValues.stickyHeader
  );
  const [variation, setVariation] = useState<TableProps['variation']>(
    initialValues.variation
  );
  return {
    highlightOnHover,
    pagination,
    selectable,
    setHighlightOnHover,
    setPagination,
    setSelectable,
    setSize,
    setStickyHeader,
    setVariation,
    size,
    stickyHeader,
    variation,
  };
};
