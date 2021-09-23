import { DividerOptions, GridContainerStyleProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { DividerPropControlsProps } from './DividerPropControls';
import { GridContainerPropControlsProps } from './GridContainerPropControls';

interface UseGridContainerProps {
  (initialValues: GridContainerStyleProps): GridContainerPropControlsProps;
}

export const useGridContainerProps: UseGridContainerProps = (initialValues) => {
  const [autoColumns, setAutoColumns] = useState(initialValues.autoColumns);
  const [autoFlow, setAutoFlow] = useState(initialValues.autoFlow);
  const [autoRows, setAutoRows] = useState(initialValues.autoRows);
  const [columnGap, setColumnGap] = useState(initialValues.columnGap);
  const [gap, setGap] = useState(initialValues.gap);
  const [rowGap, setRowGap] = useState(initialValues.rowGap);
  const [templateAreas, setTemplateAreas] = useState(
    initialValues.templateAreas
  );
  const [templateColumns, setTemplateColumns] = useState(
    initialValues.templateColumns
  );
  const [templateRows, setTemplateRows] = useState(initialValues.templateRows);
  const [alignItems, setAlignItems] = useState(initialValues.alignItems);
  const [alignContent, setAlignContent] = useState(initialValues.alignContent);
  const [justifyContent, setJustifyContent] = useState(
    initialValues.justifyContent
  );

  return {
    autoColumns,
    setAutoColumns,
    autoFlow,
    setAutoFlow,
    autoRows,
    setAutoRows,
    columnGap,
    setColumnGap,
    gap,
    setGap,
    rowGap,
    setRowGap,
    templateAreas,
    setTemplateAreas,
    templateColumns,
    setTemplateColumns,
    templateRows,
    setTemplateRows,
    alignItems,
    setAlignItems,
    alignContent,
    setAlignContent,
    justifyContent,
    setJustifyContent,
  };
};
