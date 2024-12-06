import {
  FieldsetProps,
  Flex,
  SelectField,
  SwitchField,
  TextField,
} from '@aws-amplify/ui-react';
import * as React from 'react';

export interface FieldsetPropControlsProps extends FieldsetProps {
  setDirection: (
    value: React.SetStateAction<FieldsetProps['direction']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<FieldsetProps['isDisabled']>
  ) => void;
  setLegend: (value: React.SetStateAction<FieldsetProps['legend']>) => void;
  setLegendHidden: (
    value: React.SetStateAction<FieldsetProps['legendHidden']>
  ) => void;
  setSize: (value: React.SetStateAction<FieldsetProps['size']>) => void;
  setVariation: (
    value: React.SetStateAction<FieldsetProps['variation']>
  ) => void;
}

interface FieldsetPropControlsInterface {
  (props: FieldsetPropControlsProps): React.JSX.Element;
}

export const FieldsetPropControls: FieldsetPropControlsInterface = ({
  direction,
  isDisabled,
  legend,
  legendHidden,
  size,
  variation,
  setDirection,
  setIsDisabled,
  setLegend,
  setLegendHidden,
  setSize,
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
        <option value="plain">plain (default)</option>
        <option value="outlined">outlined</option>
      </SelectField>
      <SelectField
        label="direction"
        name="direction"
        value={direction as string}
        onChange={(event) =>
          setDirection(event.target.value as FieldsetProps['direction'])
        }
      >
        <option value="column">column</option>
        <option value="column-reverse">column-reverse</option>
        <option value="row">row</option>
        <option value="row-reverse">row-reverse</option>
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
      <SwitchField
        label="legendHidden"
        isChecked={legendHidden}
        labelPosition="end"
        onChange={(event) => {
          setLegendHidden(
            event.target.checked as FieldsetProps['legendHidden']
          );
        }}
      />
    </Flex>
  );
};
