import * as React from 'react';
import {
  Flex,
  LoaderProps,
  SelectField,
  SwitchField,
  TextField,
} from '@aws-amplify/ui-react';

export interface LoaderPropControlsProps extends LoaderProps {
  setSize: (value: React.SetStateAction<LoaderProps['size']>) => void;
  setVariation: (value: React.SetStateAction<LoaderProps['variation']>) => void;
  setEmptyColor: (
    value: React.SetStateAction<LoaderProps['emptyColor']>
  ) => void;
  setFilledColor: (
    value: React.SetStateAction<LoaderProps['filledColor']>
  ) => void;
  setIsDeterminate: (
    value: React.SetStateAction<LoaderProps['isDeterminate']>
  ) => void;
  setPercentage: (
    value: React.SetStateAction<LoaderProps['percentage']>
  ) => void;
  setIsPercentageTextHidden: (
    value: React.SetStateAction<LoaderProps['isPercentageTextHidden']>
  ) => void;
}

export const LoaderPropControls: React.FC<LoaderPropControlsProps> = ({
  size,
  setSize,
  variation,
  setVariation,
  emptyColor,
  setEmptyColor,
  filledColor,
  setFilledColor,
  isDeterminate,
  setIsDeterminate,
  percentage,
  setPercentage,
  isPercentageTextHidden,
  setIsPercentageTextHidden,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        label="size"
        value={size}
        placeholder="default"
        onChange={(event) => setSize(event.target.value as LoaderProps['size'])}
      >
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
      <SelectField
        label="variation"
        value={variation}
        placeholder="default"
        onChange={(event) =>
          setVariation(event.target.value as LoaderProps['variation'])
        }
      >
        <option value="linear">linear</option>
      </SelectField>
      <TextField
        label="emptyColor"
        value={emptyColor}
        onChange={(event) => setEmptyColor(event.target.value)}
      />
      <TextField
        label="filledColor"
        value={filledColor}
        onChange={(event) => setFilledColor(event.target.value)}
      />
      <SwitchField
        label="isDeterminate"
        defaultChecked={isDeterminate}
        labelPosition="end"
        onChange={(event) => {
          setIsDeterminate(event.target.checked), setPercentage(undefined);
        }}
      />
      {isDeterminate ? (
        <TextField
          type="number"
          label="percentage"
          value={percentage}
          onChange={(event) => setPercentage(event.target.value)}
        />
      ) : null}
      {isDeterminate ? (
        <SwitchField
          label="isPercentageLabelHidden"
          defaultChecked={isPercentageTextHidden}
          labelPosition="end"
          onChange={(event) => setIsPercentageTextHidden(event.target.checked)}
        />
      ) : null}
    </Flex>
  );
};
