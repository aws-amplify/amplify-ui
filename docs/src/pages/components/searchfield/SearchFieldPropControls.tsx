import * as React from 'react';
import {
  SearchFieldProps,
  SelectField,
  TextField,
  Flex,
  CheckboxField,
} from '@aws-amplify/ui-react';

export interface SearchFieldPropControlsProps extends SearchFieldProps {
  setLabel: (value: React.SetStateAction<SearchFieldProps['label']>) => void;
  setPlaceholder: (
    value: React.SetStateAction<SearchFieldProps['placeholder']>
  ) => void;
  setSize: (value: React.SetStateAction<SearchFieldProps['size']>) => void;
  setVariation: (
    value: React.SetStateAction<SearchFieldProps['variation']>
  ) => void;
  setLabelHidden: (
    value: React.SetStateAction<SearchFieldProps['labelHidden']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<SearchFieldProps['isDisabled']>
  ) => void;
}

interface SearchFieldPropControlsInterface {
  (props: SearchFieldPropControlsProps): JSX.Element;
}

export const SearchFieldPropControls: SearchFieldPropControlsInterface = ({
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
}) => {
  return (
    <Flex direction="column">
      <TextField
        label="label"
        name="label"
        value={label as string}
        onChange={(event) => {
          setLabel(event.target.value as SearchFieldProps['label']);
        }}
      />
      <TextField
        label="placeholder"
        value={placeholder}
        onChange={(event) => {
          setPlaceholder(event.target.value as SearchFieldProps['placeholder']);
        }}
      />
      <SelectField
        label="size"
        name="size"
        id="size"
        value={size}
        onChange={(event) =>
          setSize(event.target.value as SearchFieldProps['size'])
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
            event.target.value as unknown as SearchFieldProps['variation']
          )
        }
      >
        <option value="">default</option>
        <option value="quiet">quiet</option>
      </SelectField>

      <CheckboxField
        label="labelHidden"
        name="labelHidden"
        value="labelHidden"
        checked={labelHidden}
        onChange={(event) => {
          setLabelHidden(
            Boolean(event.target.checked) as SearchFieldProps['labelHidden']
          );
        }}
      />

      <CheckboxField
        label="isDisabled"
        name="isDisabled"
        value="isDisabled"
        checked={isDisabled}
        onChange={(event) => {
          setIsDisabled(
            Boolean(event.target.checked) as SearchFieldProps['isDisabled']
          );
        }}
      />
    </Flex>
  );
};
