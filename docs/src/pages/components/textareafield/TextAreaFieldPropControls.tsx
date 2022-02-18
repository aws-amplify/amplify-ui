import * as React from 'react';
import {
  Flex,
  TextField,
  SelectField,
  SwitchField,
  TextAreaFieldProps,
} from '@aws-amplify/ui-react';

export interface TextAreaFieldControlsProps extends TextAreaFieldProps {
  setAutoComplete: (
    value: React.SetStateAction<TextAreaFieldProps['autoComplete']>
  ) => void;
  setDefaultValue: (
    value: React.SetStateAction<TextAreaFieldProps['defaultValue']>
  ) => void;
  setDescriptiveText: (
    value: React.SetStateAction<TextAreaFieldProps['descriptiveText']>
  ) => void;
  setErrorMessage: (
    value: React.SetStateAction<TextAreaFieldProps['errorMessage']>
  ) => void;
  setHasError: (
    value: React.SetStateAction<TextAreaFieldProps['hasError']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<TextAreaFieldProps['isDisabled']>
  ) => void;
  setIsReadOnly: (
    value: React.SetStateAction<TextAreaFieldProps['isReadOnly']>
  ) => void;
  setIsRequired: (
    value: React.SetStateAction<TextAreaFieldProps['isRequired']>
  ) => void;
  setLabel: (value: React.SetStateAction<TextAreaFieldProps['label']>) => void;
  setLabelHidden: (
    value: React.SetStateAction<TextAreaFieldProps['labelHidden']>
  ) => void;
  setName: (value: React.SetStateAction<TextAreaFieldProps['name']>) => void;
  setPlaceholder: (
    value: React.SetStateAction<TextAreaFieldProps['placeholder']>
  ) => void;
  setSize: (value: React.SetStateAction<TextAreaFieldProps['size']>) => void;
  setValue: (value: React.SetStateAction<TextAreaFieldProps['value']>) => void;
  setVariation: (
    value: React.SetStateAction<TextAreaFieldProps['variation']>
  ) => void;
}

interface TextAreaFieldControlsInterface {
  (props: TextAreaFieldControlsProps): JSX.Element;
}

export const TextAreaFieldPropControls: TextAreaFieldControlsInterface = ({
  autoComplete,
  setAutoComplete,
  defaultValue,
  setDefaultValue,
  hasError,
  setHasError,
  label,
  setLabel,
  descriptiveText,
  setDescriptiveText,
  setErrorMessage,
  errorMessage,
  setIsDisabled,
  isDisabled,
  setIsReadOnly,
  isReadOnly,
  setIsRequired,
  isRequired,
  setLabelHidden,
  labelHidden,
  setName,
  name,
  setPlaceholder,
  placeholder,
  setSize,
  size,
  setValue,
  value,
  setVariation,
  variation,
}) => {
  return (
    <Flex direction="column">
      <TextField
        placeholder="Set autocomplete"
        name="autocomplete"
        value={autoComplete}
        onChange={(event: any) => {
          setAutoComplete(event.target.value);
        }}
        label="autocomplete"
      />
      <TextField
        placeholder="Set default value"
        name="defaultValue"
        value={defaultValue}
        onChange={(event: any) => {
          setDefaultValue(event.target.value);
        }}
        label="defaultValue"
      />
      <TextField
        placeholder="Set label"
        name="label"
        value={label.toString()}
        onChange={(event: any) => {
          setLabel(event.target.value);
        }}
        label="label"
      />
      <TextField
        placeholder="Set name"
        name="name"
        value={name}
        onChange={(event: any) => {
          setName(event.target.value);
        }}
        label="name"
      />
      <TextField
        placeholder="Set placeholder"
        name="placeholder"
        value={placeholder}
        onChange={(event: any) => {
          setPlaceholder(event.target.value);
        }}
        label="placeholder"
      />
      <TextField
        placeholder="Set descriptive text"
        name="descriptiveText"
        value={descriptiveText.toString()}
        onChange={(event: any) => {
          setDescriptiveText(event.target.value);
        }}
        label="descriptiveText"
      />
      <TextField
        placeholder="Set error message"
        name="errorMessage"
        value={errorMessage}
        onChange={(event: any) => {
          setErrorMessage(event.target.value);
        }}
        label="errorMessage"
      />
      <TextField
        placeholder="Set value"
        name="value"
        value={value}
        onChange={(event: any) => {
          setValue(event.target.value);
        }}
        label="value"
      />
      <Flex wrap="wrap">
        <SwitchField
          placeholder="Set hasError"
          name="hasError"
          value="hasError"
          checked={hasError}
          onChange={() => {
            setHasError(!hasError);
          }}
          label="hasError"
        />
        <SwitchField
          checked={labelHidden}
          name="labelHidden"
          onChange={() => {
            setLabelHidden(!labelHidden);
          }}
          label="labelHidden"
        />
        <SwitchField
          checked={isDisabled}
          name="isDisabled"
          onChange={() => {
            setIsDisabled(!isDisabled);
          }}
          label="isDisabled"
        />
        <SwitchField
          checked={isReadOnly}
          name="isReadOnly"
          onChange={() => {
            setIsReadOnly(!isReadOnly);
          }}
          label="isReadOnly"
        />
        <SwitchField
          checked={isRequired}
          name="isRequired"
          onChange={() => {
            setIsRequired(!isRequired);
          }}
          label="isRequired"
        />
      </Flex>

      <SelectField
        name="size"
        value={size}
        placeholder="default"
        onChange={(event) =>
          setSize(event.target.value as TextAreaFieldProps['size'])
        }
        label="size"
      >
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>

      <SelectField
        name="variation"
        value={variation}
        placeholder="default"
        onChange={(event) =>
          setVariation(event.target.value as TextAreaFieldProps['variation'])
        }
        label="variation"
      >
        <option value="quiet">quiet</option>
      </SelectField>
    </Flex>
  );
};
