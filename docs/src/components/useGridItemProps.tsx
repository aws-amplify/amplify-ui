import { GridItemStyleProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { GridItemPropControlsProps } from './GridItemPropControls';

interface UseGridItemProps {
  (initialValues: GridItemStyleProps): GridItemPropControlsProps;
}

export const useGridItemProps: UseGridItemProps = (initialValues) => {
  const [area, setArea] = React.useState(initialValues.area);
  const [column, setColumn] = React.useState(initialValues.column);
  const [columnEnd, setColumnEnd] = React.useState(initialValues.columnEnd);
  const [columnSpan, setColumnSpan] = React.useState(initialValues.columnSpan);
  const [columnStart, setColumnStart] = React.useState(
    initialValues.columnStart
  );
  const [row, setRow] = React.useState(initialValues.row);
  const [rowEnd, setRowEnd] = React.useState(initialValues.rowEnd);
  const [rowSpan, setRowSpan] = React.useState(initialValues.rowSpan);
  const [rowStart, setRowStart] = React.useState(initialValues.rowStart);

  return {
    area,
    setArea,
    column,
    setColumn,
    columnEnd,
    setColumnEnd,
    columnSpan,
    setColumnSpan,
    columnStart,
    setColumnStart,
    row,
    setRow,
    rowEnd,
    setRowEnd,
    rowSpan,
    setRowSpan,
    rowStart,
    setRowStart,
  };
};
