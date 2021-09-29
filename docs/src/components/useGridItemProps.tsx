import { GridItemStyleProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { GridItemPropControlsProps } from './GridItemPropControls';

interface UseGridItemProps {
  (initialValues: GridItemStyleProps): GridItemPropControlsProps;
}

export const useGridItemProps: UseGridItemProps = (initialValues) => {
  const [area, setArea] = useState(initialValues.area);
  const [column, setColumn] = useState(initialValues.column);
  const [columnEnd, setColumnEnd] = useState(initialValues.columnEnd);
  const [columnSpan, setColumnSpan] = useState(initialValues.columnSpan);
  const [columnStart, setColumnStart] = useState(initialValues.columnStart);
  const [row, setRow] = useState(initialValues.row);
  const [rowEnd, setRowEnd] = useState(initialValues.rowEnd);
  const [rowSpan, setRowSpan] = useState(initialValues.rowSpan);
  const [rowStart, setRowStart] = useState(initialValues.rowStart);

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
