import * as React from 'react';
import { GridContainerStyleProps, TextField } from '@aws-amplify/ui-react';
import { DemoBox } from './DemoBox';
import { setgid } from 'process';

export interface GridContainerPropControlsProps
  extends GridContainerStyleProps {
  setAutoColumns: (value: any) => void;
  setAutoFlow: (value: any) => void;
  setAutoRows: (value: any) => void;
  setColumnGap: (value: any) => void;
  setGap: (value: any) => void;
  setRowGap: (value: any) => void;
  setTemplateAreas: (value: any) => void;
  setTemplateColumns: (value: any) => void;
  setTemplateRows: (value: any) => void;
  setAlignItems: (value: any) => void;
  setAlignContent: (value: any) => void;
  setJustifyContent: (value: any) => void;
}

interface GridContainerPropControls {
  (props: GridContainerPropControlsProps): JSX.Element;
}

export const GridContainerPropControls: GridContainerPropControls = ({
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
}) => {
  return (
    <DemoBox primitiveName="Grid container">
      <TextField
        label="autoColumns"
        onInput={(event) => setAutoColumns(event.target.value)}
        value={autoColumns as string}
      />
      <TextField
        label="autoFlow"
        type="number"
        onInput={(event) => setAutoFlow(event.target.value)}
        value={autoFlow as number}
      />
      <TextField
        label="autoRows"
        onInput={(event) => setAutoRows(event.target.value)}
        value={autoRows as string}
      />
      <TextField
        label="columnGap"
        onInput={(event) => setColumnGap(event.target.value)}
        value={columnGap as string}
      />
      <TextField
        label="gap"
        onInput={(event) => setGap(event.target.value)}
        value={gap as string}
      />
      <TextField
        label="rowGap"
        onInput={(event) => setRowGap(event.target.value)}
        value={rowGap as string}
      />
      <TextField
        label="templateAreas"
        as="textarea"
        height="8rem"
        onInput={(event) => setTemplateAreas(event.target.value)}
        value={templateAreas as string}
      />
      <TextField
        label="templateColumns"
        onInput={(event) => setTemplateColumns(event.target.value)}
        value={templateColumns as string}
      />
      <TextField
        label="templateRows"
        onInput={(event) => setTemplateRows(event.target.value)}
        value={templateRows as string}
      />
      <TextField
        label="alignItems"
        onInput={(event) => setAlignItems(event.target.value)}
        value={alignItems as string}
      />
      <TextField
        label="alignContent"
        onInput={(event) => setAlignContent(event.target.value)}
        value={alignContent as string}
      />
      <TextField
        label="justifyContent"
        onInput={(event) => setJustifyContent(event.target.value)}
        value={justifyContent as string}
      />
    </DemoBox>
  );
};
