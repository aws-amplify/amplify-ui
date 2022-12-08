import {
  TextFieldProps,
  TextField,
  SelectField,
  SwitchField,
  Flex,
} from '@aws-amplify/ui-react';
import * as React from 'react';

export interface TextFieldPropControlsProps extends TextFieldProps {
  setVariation: (
    value: React.SetStateAction<TextFieldProps['variation']>
  ) => void;
  setSize: (value: React.SetStateAction<TextFieldProps['size']>) => void;
  setDescriptiveText: (
    value: React.SetStateAction<TextFieldProps['descriptiveText']>
  ) => void;
  setPlaceholder: (
    value: React.SetStateAction<TextFieldProps['placeholder']>
  ) => void;
  setLabel: (value: React.SetStateAction<TextFieldProps['label']>) => void;
  setLabelHidden: (
    value: React.SetStateAction<TextFieldProps['labelHidden']>
  ) => void;
  setErrorMessage: (
    value: React.SetStateAction<TextFieldProps['errorMessage']>
  ) => void;
  setHasError: (
    value: React.SetStateAction<TextFieldProps['hasError']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<TextFieldProps['isDisabled']>
  ) => void;
}

interface TextFieldPropControlsInterface {
  (props: TextFieldPropControlsProps): JSX.Element;
}

export const TextFieldPropControls: TextFieldPropControlsInterface = ({
  variation,
  setVariation,
  size,
  setSize,
  descriptiveText,
  setDescriptiveText,
  placeholder,
  setPlaceholder,
  label,
  setLabel,
  labelHidden,
  setLabelHidden,
  errorMessage,
  setErrorMessage,
  hasError,
  setHasError,
  isDisabled,
  setIsDisabled,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        label="variation"
        value={variation}
        onChange={(event) =>
          setVariation(event.target.value as TextFieldProps['variation'])
        }
      >
        <option value="">default</option>
        <option value="quiet">quiet</option>
      </SelectField>

      <SelectField
        label="size"
        value={size}
        defaultValue="default"
        onChange={(event) =>
          setSize(event.target.value as TextFieldProps['size'])
        }
      >
        <option value="small">small</option>
        <option value="default">default</option>
        <option value="large">large</option>
      </SelectField>

      <TextField
        label="descriptiveText"
        value={descriptiveText as string}
        onChange={(event) =>
          setDescriptiveText(
            event.target.value as TextFieldProps['descriptiveText']
          )
        }
      />

      <TextField
        label="placeholder"
        value={placeholder as string}
        onChange={(event) =>
          setPlaceholder(event.target.value as TextFieldProps['placeholder'])
        }
      />

      <TextField
        label="label"
        value={label as string}
        onChange={(event) =>
          setLabel(event.target.value as TextFieldProps['label'])
        }
      />

      <SwitchField
        label="labelHidden"
        isChecked={labelHidden}
        labelPosition="end"
        onChange={(event) => {
          setLabelHidden(event.target.checked as TextFieldProps['labelHidden']);
        }}
      />

      <TextField
        label="errorMessage"
        value={errorMessage as string}
        onChange={(event) =>
          setErrorMessage(event.target.value as TextFieldProps['errorMessage'])
        }
      />

      <SwitchField
        label="hasError"
        isChecked={hasError}
        labelPosition="end"
        onChange={(event) => {
          setHasError(event.target.checked as TextFieldProps['hasError']);
        }}
      />

      <SwitchField
        label="isDisabled"
        isChecked={isDisabled}
        labelPosition="end"
        onChange={(event) => {
          setIsDisabled(event.target.checked as TextFieldProps['isDisabled']);
        }}
      />
    </Flex>
  );
};
