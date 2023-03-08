import {
  PhoneNumberFieldProps,
  TextField,
  SelectField,
  SwitchField,
  Flex,
} from '@aws-amplify/ui-react';
import * as React from 'react';

export type PhoneNumberFieldPropControlsProps = PhoneNumberFieldProps & {
  setLabel: (
    value: React.SetStateAction<PhoneNumberFieldProps['label']>
  ) => void;
  setLabelHidden: (
    value: React.SetStateAction<PhoneNumberFieldProps['labelHidden']>
  ) => void;
  setDescriptiveText: (
    value: React.SetStateAction<PhoneNumberFieldProps['descriptiveText']>
  ) => void;
  setPlaceholder: (
    value: React.SetStateAction<PhoneNumberFieldProps['placeholder']>
  ) => void;
  setSize: (value: React.SetStateAction<PhoneNumberFieldProps['size']>) => void;
  setVariation: (
    value: React.SetStateAction<PhoneNumberFieldProps['variation']>
  ) => void;
  setErrorMessage: (
    value: React.SetStateAction<PhoneNumberFieldProps['errorMessage']>
  ) => void;
  setHasError: (
    value: React.SetStateAction<PhoneNumberFieldProps['hasError']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<PhoneNumberFieldProps['isDisabled']>
  ) => void;
  setIsReadOnly: (
    value: React.SetStateAction<PhoneNumberFieldProps['isReadOnly']>
  ) => void;
  setValue: (
    value: React.SetStateAction<PhoneNumberFieldProps['value']>
  ) => void;
  setDefaultDialCode: (
    value: React.SetStateAction<PhoneNumberFieldProps['defaultDialCode']>
  ) => void;
};

interface PhoneNumberFieldPropControlsInterface {
  (props: PhoneNumberFieldPropControlsProps): JSX.Element;
}

export const PhoneNumberFieldPropControls: PhoneNumberFieldPropControlsInterface =
  ({
    label,
    setLabel,
    labelHidden,
    setLabelHidden,
    descriptiveText,
    setDescriptiveText,
    placeholder,
    setPlaceholder,
    size,
    setSize,
    variation,
    setVariation,
    errorMessage,
    setErrorMessage,
    hasError,
    setHasError,
    isDisabled,
    setIsDisabled,
    isReadOnly,
    setIsReadOnly,
  }) => {
    return (
      <Flex direction="column">
        <TextField
          label="label"
          value={label as string}
          onChange={(event) =>
            setLabel(event.target.value as PhoneNumberFieldProps['label'])
          }
        />
        <SwitchField
          label="labelHidden"
          isChecked={labelHidden}
          labelPosition="end"
          onChange={(event) => {
            setLabelHidden(
              event.target.checked as PhoneNumberFieldProps['labelHidden']
            );
          }}
        />
        <TextField
          label="descriptiveText"
          value={descriptiveText as string}
          onChange={(event) =>
            setDescriptiveText(
              event.target.value as PhoneNumberFieldProps['descriptiveText']
            )
          }
        />
        <TextField
          label="placeholder"
          value={placeholder as string}
          onChange={(event) =>
            setPlaceholder(
              event.target.value as PhoneNumberFieldProps['placeholder']
            )
          }
        />
        <SelectField
          label="size"
          value={size}
          onChange={(event) =>
            setSize(event.target.value as PhoneNumberFieldProps['size'])
          }
        >
          <option value="">default</option>
          <option value="small">small</option>
          <option value="large">large</option>
        </SelectField>

        <SelectField
          label="variation"
          value={variation}
          onChange={(event) =>
            setVariation(
              event.target.value as PhoneNumberFieldProps['variation']
            )
          }
        >
          <option value="">default</option>
          <option value="quiet">quiet</option>
        </SelectField>
        <TextField
          label="errorMessage"
          value={errorMessage as string}
          onChange={(event) =>
            setErrorMessage(
              event.target.value as PhoneNumberFieldProps['errorMessage']
            )
          }
        />
        <SwitchField
          label="hasError"
          isChecked={hasError}
          labelPosition="end"
          onChange={(event) => {
            setHasError(
              event.target.checked as PhoneNumberFieldProps['hasError']
            );
          }}
        />
        <SwitchField
          label="isDisabled"
          isChecked={isDisabled}
          labelPosition="end"
          onChange={(event) => {
            setIsDisabled(
              event.target.checked as PhoneNumberFieldProps['isDisabled']
            );
          }}
        />
        <SwitchField
          label="isReadOnly"
          isChecked={isReadOnly}
          labelPosition="end"
          onChange={(event) => {
            setIsReadOnly(
              event.target.checked as PhoneNumberFieldProps['isReadOnly']
            );
          }}
        />
      </Flex>
    );
  };
