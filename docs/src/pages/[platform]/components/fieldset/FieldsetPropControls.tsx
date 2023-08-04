import {
  FieldsetProps,
  Flex,
  SelectField,
  SwitchField,
  TextField,
} from '@aws-amplify/ui-react';
import * as React from 'react';

export interface FieldsetPropControlsProps extends FieldsetProps {
  setIsDisabled: (
    value: React.SetStateAction<FieldsetProps['isDisabled']>
  ) => void;
  setLegend: (value: React.SetStateAction<FieldsetProps['legend']>) => void;
  setSize: (value: React.SetStateAction<FieldsetProps['size']>) => void;
  setVariation: (
    value: React.SetStateAction<FieldsetProps['variation']>
  ) => void;
}

interface FieldsetPropControlsInterface {
  (props: FieldsetPropControlsProps): JSX.Element;
}

export const FieldsetPropControls: FieldsetPropControlsInterface = ({
  isDisabled,
  setIsDisabled,
  legend,
  setLegend,
  size,
  setSize,
  variation,
  setVariation,
}) => {
  return (
    <Flex direction="column">
      <TextField
        label="Legend"
        value={legend as string}
        onChange={(event) =>
          setLegend(event.target.value as FieldsetProps['legend'])
        }
      />
      <SelectField
        name="variation"
        label="Variation"
        value={variation}
        onChange={(event) =>
          setVariation(event.target.value as FieldsetProps['variation'])
        }
      >
        <option value="">default</option>
        <option value="outlined">outlined</option>
      </SelectField>
      <SelectField
        name="size"
        label="Size"
        defaultValue=""
        value={size}
        onChange={(event) =>
          setSize(event.target.value as FieldsetProps['size'])
        }
      >
        <option value="small">small</option>
        <option value="">default</option>
        <option value="large">large</option>
      </SelectField>
      <SwitchField
        label="isDisabled"
        isChecked={isDisabled}
        labelPosition="end"
        onChange={(event) => {
          setIsDisabled(event.target.checked as FieldsetProps['isDisabled']);
        }}
      />
    </Flex>
  );
};
