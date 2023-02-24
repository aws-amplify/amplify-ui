import * as React from 'react';
import {
  RatingProps,
  TextField,
  SelectField,
  Flex,
} from '@aws-amplify/ui-react';

export interface RatingPropControlsProps extends RatingProps {
  setValue: (value: React.SetStateAction<RatingProps['value']>) => void;
  setMaxValue: (value: React.SetStateAction<RatingProps['maxValue']>) => void;
  setSize: (value: React.SetStateAction<RatingProps['size']>) => void;
  setFillColor: (value: React.SetStateAction<RatingProps['fillColor']>) => void;
  setEmptyColor: (
    value: React.SetStateAction<RatingProps['emptyColor']>
  ) => void;
}

interface RatingPropControlsInterface {
  (props: RatingPropControlsProps): JSX.Element;
}

export const RatingPropControls: RatingPropControlsInterface = ({
  value,
  maxValue,
  size,
  fillColor,
  emptyColor,
  setValue,
  setMaxValue,
  setSize,
  setFillColor,
  setEmptyColor,
}) => {
  return (
    <Flex direction="column">
      <TextField
        label="value"
        value={value}
        placeholder="Set Value"
        // @ts-ignore // IGNORE
        onChange={(event) => setValue(event.target.value)}
      />

      <TextField
        label="maxValue"
        value={maxValue}
        placeholder="Set Max Value"
        // @ts-ignore // IGNORE
        onChange={(event) => setMaxValue(event.target.value)}
      />

      <SelectField
        name="size"
        id="size"
        label="size"
        value={size}
        onChange={(event) =>
          setSize(
            event.target.value as React.SetStateAction<RatingProps['size']>
          )
        }
      >
        <option value=" "></option>
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </SelectField>

      <TextField
        label="fillColor"
        // @ts-ignore // IGNORE
        value={fillColor}
        placeholder="Set Fill Color"
        onChange={(event) => setFillColor(event.target.value)}
      />

      <TextField
        label="emptyColor"
        // @ts-ignore // IGNORE
        value={emptyColor}
        placeholder="Set Empty Color"
        onChange={(event) => setEmptyColor(event.target.value)}
      />
    </Flex>
  );
};
