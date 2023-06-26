import * as React from 'react';
import {
  Flex,
  TextField,
  SelectField,
  SwitchField,
  BaseTextAreaFieldProps,
} from '@aws-amplify/ui-react';

export interface TextAreaFieldControlsProps extends BaseTextAreaFieldProps {
  setAutoComplete: (
    value: React.SetStateAction<BaseTextAreaFieldProps['autoComplete']>
  ) => void;
  setDefaultValue: (
    value: React.SetStateAction<BaseTextAreaFieldProps['defaultValue']>
  ) => void;
  setDescriptiveText: (
    value: React.SetStateAction<BaseTextAreaFieldProps['descriptiveText']>
  ) => void;
  setErrorMessage: (
    value: React.SetStateAction<BaseTextAreaFieldProps['errorMessage']>
  ) => void;
  setHasError: (
    value: React.SetStateAction<BaseTextAreaFieldProps['hasError']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<BaseTextAreaFieldProps['isDisabled']>
  ) => void;
  setIsReadOnly: (
    value: React.SetStateAction<BaseTextAreaFieldProps['isReadOnly']>
  ) => void;
  setIsRequired: (
    value: React.SetStateAction<BaseTextAreaFieldProps['isRequired']>
  ) => void;
  setLabel: (
    value: React.SetStateAction<BaseTextAreaFieldProps['label']>
  ) => void;
  setLabelHidden: (
    value: React.SetStateAction<BaseTextAreaFieldProps['labelHidden']>
  ) => void;
  setMaxLength: (
    value: React.SetStateAction<BaseTextAreaFieldProps['maxLength']>
  ) => void;
  setName: (
    value: React.SetStateAction<BaseTextAreaFieldProps['name']>
  ) => void;
  setPlaceholder: (
    value: React.SetStateAction<BaseTextAreaFieldProps['placeholder']>
  ) => void;
  setSize: (
    value: React.SetStateAction<BaseTextAreaFieldProps['size']>
  ) => void;
  setRows: (
    value: React.SetStateAction<BaseTextAreaFieldProps['rows']>
  ) => void;
  setValue: (
    value: React.SetStateAction<BaseTextAreaFieldProps['value']>
  ) => void;
  setVariation: (
    value: React.SetStateAction<BaseTextAreaFieldProps['variation']>
  ) => void;
}

interface TextAreaFieldControlsInterface {
  (props: TextAreaFieldControlsProps): JSX.Element;
}

export const TextAreaFieldPropControls: TextAreaFieldControlsInterface = ({
  autoComplete,
  defaultValue,
  descriptiveText,
  errorMessage,
  hasError,
  isDisabled,
  isReadOnly,
  isRequired,
  label,
  labelHidden,
  maxLength,
  name,
  placeholder,
  rows,
  setAutoComplete,
  setDefaultValue,
  setDescriptiveText,
  setErrorMessage,
  setHasError,
  setIsDisabled,
  setIsReadOnly,
  setIsRequired,
  setLabel,
  setLabelHidden,
  setMaxLength,
  setName,
  setPlaceholder,
  setRows,
  setSize,
  setValue,
  setVariation,
  size,
  value,
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
        placeholder="Set rows"
        name="rows"
        value={rows}
        onChange={(event: any) => {
          setRows(event.target.value);
        }}
        label="rows"
      />
      <TextField
        placeholder="Set maxLength"
        name="maxLength"
        value={maxLength}
        onChange={(event: any) => {
          setMaxLength(event.target.value);
        }}
        label="maxLength"
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
          setSize(event.target.value as BaseTextAreaFieldProps['size'])
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
          setVariation(
            event.target.value as BaseTextAreaFieldProps['variation']
          )
        }
        label="variation"
      >
        <option value="quiet">quiet</option>
      </SelectField>
    </Flex>
  );
};
