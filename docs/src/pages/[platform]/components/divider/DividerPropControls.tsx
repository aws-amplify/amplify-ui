import * as React from 'react';
import {
  DividerOptions,
  Flex,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';

export interface DividerPropControlsProps extends DividerOptions {
  setLabel: (value: React.SetStateAction<DividerOptions['label']>) => void;
  setSize: (value: React.SetStateAction<DividerOptions['size']>) => void;
  setOrientation: (
    value: React.SetStateAction<DividerOptions['orientation']>
  ) => void;
}

interface DividerPropControlsInterface {
  (props: DividerPropControlsProps): JSX.Element;
}

export const DividerPropControls: DividerPropControlsInterface = ({
  size,
  setSize,
  orientation,
  setOrientation,
  label,
  setLabel,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        name="size"
        id="size"
        label="Size"
        value={size}
        onChange={(event) =>
          setSize(event.target.value as DividerOptions['size'])
        }
      >
        <option value="">default</option>
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>

      <SelectField
        name="orientation"
        id="orientation"
        label="Orientation"
        value={orientation}
        onChange={(event) =>
          setOrientation(event.target.value as DividerOptions['orientation'])
        }
      >
        <option value="horizontal">horizontal</option>
        <option value="vertical">vertical</option>
      </SelectField>

      <TextField
        name="label"
        label="label"
        value={label}
        onChange={(event) => setLabel(event.target.value)}
      />
    </Flex>
  );
};
