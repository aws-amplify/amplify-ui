import * as React from 'react';

import {
  CheckboxField,
  Flex,
  SelectField,
  TableProps,
  TextField,
} from '@aws-amplify/ui-react';

export interface TablePropControlsProps extends TableProps {
  setCaption: (value: React.SetStateAction<TableProps['caption']>) => void;
  setHighlightOnHover: (
    value: React.SetStateAction<TableProps['highlightOnHover']>
  ) => void;
  setSize: (value: React.SetStateAction<TableProps['size']>) => void;
  setVariation: (value: React.SetStateAction<TableProps['variation']>) => void;
}

interface TablePropControlsInterface {
  (props: TablePropControlsProps): JSX.Element;
}

export const TablePropControls: TablePropControlsInterface = ({
  highlightOnHover,
  setCaption,
  setHighlightOnHover,
  setSize,
  setVariation,
  size,
  variation,
}) => (
  <Flex direction="column">
    <TextField
      id="caption-control"
      label="caption"
      name="caption-control"
      placeholder="Table Caption"
      onChange={(event) =>
        setCaption(event.target.value as TableProps['caption'])
      }
    />
    <CheckboxField
      name="highlightonhover"
      value="false"
      checked={highlightOnHover}
      label="highlightOnHover"
      onChange={(e) => setHighlightOnHover(e.target.checked)}
    />
    <SelectField
      id="sizeProp"
      name="size"
      label="size"
      placeholder="(default)"
      value={size}
      onChange={(e) => setSize(e.target.value as TableProps['size'])}
    >
      <option value="small">small</option>
      <option value="large">large</option>
    </SelectField>
    <SelectField
      id="variationProp"
      name="variation"
      label="variation"
      placeholder="(default)"
      value={variation}
      onChange={(e) => setVariation(e.target.value as TableProps['variation'])}
    >
      <option value="bordered">bordered</option>
      <option value="striped">striped</option>
    </SelectField>
  </Flex>
);
