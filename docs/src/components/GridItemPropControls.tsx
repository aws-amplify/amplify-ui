/**
 * NOTE:
 * Many grid item props were left out of this demo
 * due to a react error which occurs when shorthand and longhand style properties conflict
 * See ticket: https://app.asana.com/0/1200141963577341/1201047184251871/f
 */

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
  columnEnd,
  setColumnEnd,
  columnStart,
  setColumnStart,
  rowEnd,
  setRowEnd,
  rowStart,
  setRowStart,
}) => {
  return (
    <DemoBox primitiveName={primitiveName}>
      <TextField
        label="columnStart"
        onInput={(event) => setColumnStart(event.target.value)}
        value={columnStart as string}
      />
      <TextField
        label="columnEnd"
        onInput={(event) => setColumnEnd(event.target.value)}
        value={columnEnd as string}
      />
      <TextField
        label="rowStart"
        onInput={(event) => setRowStart(event.target.value)}
        value={rowStart as number}
      />
      <TextField
        label="rowEnd"
        onInput={(event) => setRowEnd(event.target.value)}
        value={rowEnd as string}
      />
    </DemoBox>
  );
};
