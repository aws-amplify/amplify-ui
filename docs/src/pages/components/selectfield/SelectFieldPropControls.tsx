import * as React from 'react';

import {
  CheckboxField,
  SelectField,
  SelectFieldProps,
  TextField,
  Flex,
} from '@aws-amplify/ui-react';

export interface SelectFieldPropControlsProps extends SelectFieldProps {
  setDescriptiveText: (
    value: React.SetStateAction<SelectFieldProps['descriptiveText']>
  ) => void;
  setErrorMessage: (
    value: React.SetStateAction<SelectFieldProps['errorMessage']>
  ) => void;
  setHasError: (
    value: React.SetStateAction<SelectFieldProps['hasError']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<SelectFieldProps['isDisabled']>
  ) => void;
  setLabel: (value: React.SetStateAction<SelectFieldProps['label']>) => void;
  setIsLabelHidden: (
    value: React.SetStateAction<SelectFieldProps['isLabelHidden']>
  ) => void;
  setSize: (value: React.SetStateAction<SelectFieldProps['size']>) => void;
  setVariation: (
    value: React.SetStateAction<SelectFieldProps['variation']>
  ) => void;
}

interface SelectFieldPropControlsInterface {
  (props: SelectFieldPropControlsProps): JSX.Element;
}

export const SelectFieldPropControls: SelectFieldPropControlsInterface = ({
  descriptiveText,
  errorMessage,
  hasError,
  isDisabled,
  label,
  isLabelHidden,
  size,
  variation,
  setDescriptiveText,
  setErrorMessage,
  setHasError,
  setIsDisabled,
  setLabel,
  setIsLabelHidden,
  setSize,
  setVariation,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        label="size"
        name="size"
        placeholder="default"
        value={size}
        onChange={(event) =>
          setSize(event.target.value as SelectFieldProps['size'])
        }
      >
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>

      <SelectField
        label="variation"
        name="variation"
        placeholder="default"
        value={variation}
        onChange={(event) =>
          setVariation(event.target.value as SelectFieldProps['variation'])
        }
      >
        <option value="quiet">quiet</option>
      </SelectField>

      <TextField
        label="label"
        name="label"
        placeholder="Specify a label"
        value={label as string}
        onChange={(event) =>
          setLabel(event.target.value as SelectFieldProps['label'])
        }
      />

      <TextField
        label="descriptiveText"
        name="descriptiveText"
        placeholder="Provide some descriptive text"
        value={descriptiveText as string}
        onChange={(event) =>
          setDescriptiveText(
            event.target.value as SelectFieldProps['descriptiveText']
          )
        }
      />

      <TextField
        label="errorMessage"
        name="errorMessage"
        placeholder="Specify error message"
        value={errorMessage}
        onChange={(event) =>
          setErrorMessage(
            event.target.value as SelectFieldProps['errorMessage']
          )
        }
      />

      <CheckboxField
        name="isLabelHidden"
        value="yes"
        checked={isLabelHidden}
        onChange={(event) => {
          setIsLabelHidden(
            Boolean(event.target.checked) as SelectFieldProps['isLabelHidden']
          );
        }}
        label="isLabelHidden"
      />

      <CheckboxField
        name="hasError"
        value="yes"
        checked={hasError}
        onChange={(event) => {
          setHasError(
            Boolean(event.target.checked) as SelectFieldProps['hasError']
          );
        }}
        label="hasError"
      />

      <CheckboxField
        name="isDisabled"
        value="yes"
        checked={isDisabled}
        onChange={(event) => {
          setIsDisabled(
            Boolean(event.target.checked) as SelectFieldProps['isDisabled']
          );
        }}
        label="isDisabled"
      />
    </Flex>
  );
};
