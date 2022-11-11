import * as React from 'react';
import {
  AutocompleteProps,
  Flex,
  SelectField,
  SwitchField,
  TextField,
} from '@aws-amplify/ui-react';

export interface AutocompletePropControlsProps extends AutocompleteProps {
  setLabel: (value: React.SetStateAction<AutocompleteProps['label']>) => void;
  setPlaceholder: (
    value: React.SetStateAction<AutocompleteProps['placeholder']>
  ) => void;
  setSize: (value: React.SetStateAction<AutocompleteProps['size']>) => void;
  setVariation: (
    value: React.SetStateAction<AutocompleteProps['variation']>
  ) => void;
  setLabelHidden: (
    value: React.SetStateAction<AutocompleteProps['labelHidden']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<AutocompleteProps['isDisabled']>
  ) => void;
  setIsLoading: (
    value: React.SetStateAction<AutocompleteProps['isLoading']>
  ) => void;
}

interface AutocompletePropControlsInterface {
  (props: AutocompletePropControlsProps): JSX.Element;
}

export const AutocompletePropControls: AutocompletePropControlsInterface = ({
  label,
  setLabel,
  placeholder,
  setPlaceholder,
  size,
  setSize,
  variation,
  setVariation,
  labelHidden,
  setLabelHidden,
  isDisabled,
  setIsDisabled,
  isLoading,
  setIsLoading,
}) => {
  return (
    <Flex direction="column">
      <TextField
        label="label"
        name="label"
        value={label as string}
        onChange={(event) => {
          setLabel(event.target.value as AutocompleteProps['label']);
        }}
      />
      <TextField
        label="placeholder"
        value={placeholder}
        onChange={(event) => {
          setPlaceholder(
            event.target.value as AutocompleteProps['placeholder']
          );
        }}
      />
      <SelectField
        label="size"
        name="size"
        id="size"
        value={size}
        onChange={(event) =>
          setSize(event.target.value as AutocompleteProps['size'])
        }
      >
        <option value="">default</option>
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
      <SelectField
        label="variation"
        name="variation"
        id="variation"
        value={variation}
        onChange={(event) =>
          setVariation(
            event.target.value as unknown as AutocompleteProps['variation']
          )
        }
      >
        <option value="">default</option>
        <option value="quiet">quiet</option>
      </SelectField>
      <SwitchField
        label="isLoading"
        name="isLoading"
        isChecked={isLoading}
        onChange={(event) => {
          setIsLoading(
            Boolean(event.target.checked) as AutocompleteProps['isLoading']
          );
        }}
      />
      <SwitchField
        label="labelHidden"
        name="labelHidden"
        isChecked={labelHidden}
        onChange={(event) => {
          setLabelHidden(
            Boolean(event.target.checked) as AutocompleteProps['labelHidden']
          );
        }}
      />
      <SwitchField
        label="isDisabled"
        name="isDisabled"
        isChecked={isDisabled}
        onChange={(event) => {
          setIsDisabled(
            Boolean(event.target.checked) as AutocompleteProps['isDisabled']
          );
        }}
      />
    </Flex>
  );
};
