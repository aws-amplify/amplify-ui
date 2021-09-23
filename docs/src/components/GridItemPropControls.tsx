import * as React from 'react';
import { GridItemStyleProps, TextField } from '@aws-amplify/ui-react';
import { DemoBox } from './DemoBox';

export interface GridItemPropControlsProps extends GridItemStyleProps {
  primitiveName: string;
  setArea: (value: any) => void;
  setColumn: (value: any) => void;
  setColumnEnd: (value: any) => void;
  setColumnSpan: (value: number | 'auto' | null) => void;
  setColumnStart: (value: any) => void;
  setRow: (value: any) => void;
  setRowEnd: (value: any) => void;
  setRowSpan: (value: any) => void;
  setRowStart: (value: any) => void;
}

interface GridItemPropControls {
  (props: GridItemPropControlsProps): JSX.Element;
}

export const GridItemPropControls: GridItemPropControls = ({
  primitiveName,
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
}) => {
  return (
    <DemoBox primitiveName={primitiveName}>
      <TextField
        label="area"
        onInput={(event) => setArea(event.target.value)}
        value={area as string}
      />
      <TextField
        label="column"
        onInput={(event) => setColumn(event.target.value)}
        value={column as string}
      />
      <TextField
        label="columnEnd"
        onInput={(event) => setColumnEnd(event.target.value)}
        value={columnEnd as string}
      />
      <TextField
        label="columnSpan"
        onInput={(event) => {
          const value = event.target.value.trim();
          const numberValue = parseInt(value);
          if (typeof numberValue === 'number' && !isNaN(numberValue)) {
            setColumnSpan(numberValue as number);
          }
          if (value === 'auto' || value === '') {
            setColumnSpan((value as 'auto') || null);
          }
        }}
        value={columnSpan as number}
      />
      <TextField
        label="columnStart"
        onInput={(event) => setColumnStart(event.target.value)}
        value={columnStart as string}
      />
      <TextField
        label="row"
        onInput={(event) => setRow(event.target.value)}
        value={row as string}
      />
      <TextField
        label="rowEnd"
        onInput={(event) => setRowEnd(event.target.value)}
        value={rowEnd as string}
      />
      <TextField
        label="rowSpan"
        onInput={(event) => {
          const value = event.target.value.trim();
          const numberValue = parseInt(value);
          if (typeof numberValue === 'number' && !isNaN(numberValue)) {
            setRowSpan(numberValue as number);
          }
          if (value === 'auto' || value === '') {
            setRowSpan((value as 'auto') || null);
          }
        }}
        value={rowSpan as number}
      />
      <TextField
        label="rowStart"
        onInput={(event) => setRowStart(event.target.value)}
        value={rowStart as number}
      />
    </DemoBox>
  );
};
