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
  function handleValueChange(value: string) {
    if (value === '') {
      setValue(0);
    } else if (parseFloat(value)) {
      setValue(parseFloat(value));
    }
  }

  function handleMaxValueChange(value: string) {
    if (value === '') {
      setMaxValue(0);
    } else if (parseInt(value)) {
      setMaxValue(parseInt(value));
    }
  }

  return (
    <Flex direction="column">
      <TextField
        label="value"
        value={value}
        placeholder="Set Value"
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleValueChange(event.target.value)
        }
      />

      <TextField
        label="maxValue"
        value={maxValue}
        placeholder="Set Max Value"
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleMaxValueChange(event.target.value)
        }
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
        value={fillColor as string}
        placeholder="Set Fill Color"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFillColor(event.target.value)
        }
      />

      <TextField
        label="emptyColor"
        value={emptyColor as string}
        placeholder="Set Empty Color"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setEmptyColor(event.target.value)
        }
      />
    </Flex>
  );
};
