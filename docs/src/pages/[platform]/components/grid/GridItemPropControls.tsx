/**
 * NOTE:
 * Many grid item props were left out of this demo
 * due to a react error which occurs when shorthand and longhand style properties conflict
 * See ticket: https://app.asana.com/0/1200141963577341/1201047184251871/f
 */

import * as React from 'react';
import { Flex, GridItemStyleProps, TextField } from '@aws-amplify/ui-react';

export interface GridItemPropControlsProps extends GridItemStyleProps {
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
    <Flex direction="column">
      <TextField
        label="columnStart"
        onChange={(event) => setColumnStart(event.target.value)}
        value={columnStart as string}
      />
      <TextField
        label="columnEnd"
        onChange={(event) => setColumnEnd(event.target.value)}
        value={columnEnd as string}
      />
      <TextField
        label="rowStart"
        onChange={(event) => setRowStart(event.target.value)}
        value={rowStart as number}
      />
      <TextField
        label="rowEnd"
        onChange={(event) => setRowEnd(event.target.value)}
        value={rowEnd as string}
      />
    </Flex>
  );
};
