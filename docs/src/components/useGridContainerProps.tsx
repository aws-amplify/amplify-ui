import { GridContainerStyleProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { GridContainerPropControlsProps } from './GridContainerPropControls';

interface UseGridContainerProps {
  (initialValues: GridContainerStyleProps): GridContainerPropControlsProps;
}

export const useGridContainerProps: UseGridContainerProps = (initialValues) => {
  const [autoColumns, setAutoColumns] = React.useState(
    initialValues.autoColumns
  );
  const [autoFlow, setAutoFlow] = React.useState(initialValues.autoFlow);
  const [autoRows, setAutoRows] = React.useState(initialValues.autoRows);
  const [columnGap, setColumnGap] = React.useState(initialValues.columnGap);
  const [gap, setGap] = React.useState(initialValues.gap);
  const [rowGap, setRowGap] = React.useState(initialValues.rowGap);
  const [templateAreas, setTemplateAreas] = React.useState(
    initialValues.templateAreas
  );
  const [templateColumns, setTemplateColumns] = React.useState(
    initialValues.templateColumns
  );
  const [templateRows, setTemplateRows] = React.useState(
    initialValues.templateRows
  );
  const [alignItems, setAlignItems] = React.useState(initialValues.alignItems);
  const [alignContent, setAlignContent] = React.useState(
    initialValues.alignContent
  );
  const [justifyContent, setJustifyContent] = React.useState(
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
