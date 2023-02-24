import * as React from 'react';
import {
  Flex,
  GridContainerStyleProps,
  TextField,
} from '@aws-amplify/ui-react';

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
    <Flex direction="column">
      <TextField
        label="autoColumns"
        // @ts-ignore // IGNORE
        onInput={(event) => setAutoColumns(event.target.value)}
        value={autoColumns as string}
      />
      <TextField
        label="autoFlow"
        // @ts-ignore // IGNORE
        onInput={(event) => setAutoFlow(event.target.value)}
        value={autoFlow as number}
      />
      <TextField
        label="autoRows"
        // @ts-ignore // IGNORE
        onInput={(event) => setAutoRows(event.target.value)}
        value={autoRows as string}
      />
      <TextField
        label="columnGap"
        // @ts-ignore // IGNORE
        onInput={(event) => setColumnGap(event.target.value)}
        value={columnGap as string}
      />
      <TextField
        label="gap"
        // @ts-ignore // IGNORE
        onInput={(event) => setGap(event.target.value)}
        value={gap as string}
      />
      <TextField
        label="rowGap"
        // @ts-ignore // IGNORE
        onInput={(event) => setRowGap(event.target.value)}
        value={rowGap as string}
      />
      <TextField
        label="templateAreas"
        // @ts-ignore // IGNORE
        onInput={(event) => setTemplateAreas(event.target.value)}
        value={templateAreas as string}
      />
      <TextField
        label="templateColumns"
        // @ts-ignore // IGNORE
        onInput={(event) => setTemplateColumns(event.target.value)}
        value={templateColumns as string}
      />
      <TextField
        label="templateRows"
        // @ts-ignore // IGNORE
        onInput={(event) => setTemplateRows(event.target.value)}
        value={templateRows as string}
      />
      <TextField
        label="alignItems"
        // @ts-ignore // IGNORE
        onInput={(event) => setAlignItems(event.target.value)}
        value={alignItems as string}
      />
      <TextField
        label="alignContent"
        // @ts-ignore // IGNORE
        onInput={(event) => setAlignContent(event.target.value)}
        value={alignContent as string}
      />
      <TextField
        label="justifyContent"
        // @ts-ignore // IGNORE
        onInput={(event) => setJustifyContent(event.target.value)}
        value={justifyContent as string}
      />
    </Flex>
  );
};
