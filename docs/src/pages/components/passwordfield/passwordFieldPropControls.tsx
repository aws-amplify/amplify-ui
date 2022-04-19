import {
  PasswordFieldProps,
  Flex,
  TextField,
  SelectField,
  SwitchField,
} from '@aws-amplify/ui-react';

export interface PasswordFieldControlProps extends PasswordFieldProps {
  setDefaultValue: (
    value: React.SetStateAction<PasswordFieldProps['defaultValue']>
  ) => void;
  setAutoComplete: (
    value: React.SetStateAction<PasswordFieldProps['autoComplete']>
  ) => void;
  setDescriptiveText: (
    value: React.SetStateAction<PasswordFieldProps['descriptiveText']>
  ) => void;
  setErrorMessage: (
    value: React.SetStateAction<PasswordFieldProps['errorMessage']>
  ) => void;
  setHasError: (
    value: React.SetStateAction<PasswordFieldProps['hasError']>
  ) => void;
  setInputMode: (
    value: React.SetStateAction<PasswordFieldProps['inputMode']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<PasswordFieldProps['isDisabled']>
  ) => void;
  setIsReadOnly: (
    value: React.SetStateAction<PasswordFieldProps['isReadOnly']>
  ) => void;
  setIsRequired: (
    value: React.SetStateAction<PasswordFieldProps['isRequired']>
  ) => void;
  setLabelHidden: (
    value: React.SetStateAction<PasswordFieldProps['labelHidden']>
  ) => void;
  setName: (value: React.SetStateAction<PasswordFieldProps['name']>) => void;
  setPlaceholder: (
    value: React.SetStateAction<PasswordFieldProps['placeholder']>
  ) => void;
  setLabel: (value: React.SetStateAction<PasswordFieldProps['label']>) => void;
  setSize: (value: React.SetStateAction<PasswordFieldProps['size']>) => void;
  setValue: (value: React.SetStateAction<PasswordFieldProps['value']>) => void;
  setVariation: (
    value: React.SetStateAction<PasswordFieldProps['variation']>
  ) => void;
  setHideShowPassword: (
    value: React.SetStateAction<PasswordFieldProps['hideShowPassword']>
  ) => void;
}

interface PasswordFieldPropControlsInterface {
  (props: PasswordFieldControlProps): JSX.Element;
}

export const PasswordFieldPropControls: PasswordFieldPropControlsInterface = ({
  autoComplete,
  setAutoComplete,
  defaultValue,
  setDefaultValue,
  errorMessage,
  setErrorMessage,
  hasError,
  setHasError,
  inputMode,
  setInputMode,
  isDisabled,
  setIsDisabled,
  isReadOnly,
  setIsReadOnly,
  isRequired,
  setIsRequired,
  label,
  setLabel,
  labelHidden,
  setLabelHidden,
  name,
  setName,
  placeholder,
  setPlaceholder,
  size,
  setSize,
  value,
  setValue,
  variation,
  setVariation,
  hideShowPassword,
  setHideShowPassword,
  descriptiveText,
  setDescriptiveText,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        name="autoComplete"
        id="autoComplete"
        label="autoComplete"
        value={autoComplete}
        onChange={(event) => setAutoComplete(event.target.value)}
      >
        <option value="current-password">current-password</option>
        <option value="new-password">new-password</option>
      </SelectField>

      <TextField
        label="defaultValue"
        name="defaultValue"
        id="defaultValue"
        placeholder="set defaultValue"
        value={defaultValue}
        onChange={(event) => {
          setDefaultValue(
            event.target.value as PasswordFieldProps['defaultValue']
          );
        }}
      />

      <TextField
        label="descriptiveText"
        name="descriptiveText"
        id="descriptiveText"
        placeholder="set descriptiveText"
        value={descriptiveText as string}
        onChange={(event) => {
          setDescriptiveText(
            event.target.value as PasswordFieldProps['descriptiveText']
          );
        }}
      />

      <TextField
        label="errorMessage"
        name="errorMessage"
        id="errorMessage"
        placeholder="set errorMessage"
        value={errorMessage}
        onChange={(event) => {
          setErrorMessage(
            event.target.value as PasswordFieldProps['errorMessage']
          );
        }}
      />

      <SwitchField
        label="hasError"
        defaultChecked={hasError}
        labelPosition="end"
        onChange={(event) => {
          setHasError(event.target.checked as PasswordFieldProps['hasError']);
        }}
      />

      <SelectField
        name="inputMode"
        id="inputMode"
        label="inputMode"
        value={inputMode}
        onChange={(event) =>
          setInputMode(event.target.value as PasswordFieldProps['inputMode'])
        }
      >
        <option value="none">None</option>
        <option value="text">Text</option>
        <option value="decimal">Decimal</option>
        <option value="numeric">Numeric</option>
        <option value="tel">Tel</option>
        <option value="search">Search</option>
        <option value="email">Email</option>
        <option value="url">Url</option>
      </SelectField>

      <SwitchField
        label="isDisabled"
        defaultChecked={isDisabled}
        labelPosition="end"
        onChange={(event) => {
          setIsDisabled(
            event.target.checked as PasswordFieldProps['isDisabled']
          );
        }}
      />

      <SwitchField
        label="isReadOnly"
        defaultChecked={isReadOnly}
        labelPosition="end"
        onChange={(event) => {
          setIsReadOnly(
            event.target.checked as PasswordFieldProps['isReadOnly']
          );
        }}
      />

      <SwitchField
        label="isRequired"
        defaultChecked={isRequired}
        labelPosition="end"
        onChange={(event) => {
          setIsRequired(
            event.target.checked as PasswordFieldProps['isRequired']
          );
        }}
      />

      <TextField
        label="label"
        name="label"
        id="label"
        placeholder="set label"
        value={label as string}
        onChange={(event) => {
          setLabel(event.target.value as PasswordFieldProps['label']);
        }}
      />

      <SwitchField
        label="labelHidden"
        defaultChecked={labelHidden}
        labelPosition="end"
        onChange={(event) => {
          setLabelHidden(
            event.target.checked as PasswordFieldProps['labelHidden']
          );
        }}
      />

      <TextField
        label="name"
        name="name"
        id="name"
        placeholder="set name"
        value={name}
        onChange={(event) => {
          setName(event.target.value as PasswordFieldProps['name']);
        }}
      />

      <TextField
        label="placeholder"
        name="placeholder"
        id="placeholder"
        placeholder="set placeholder"
        value={placeholder}
        onChange={(event) => {
          setPlaceholder(
            event.target.value as PasswordFieldProps['placeholder']
          );
        }}
      />

      <SelectField
        name="size"
        id="size"
        label="size"
        value={size}
        onChange={(event) =>
          setSize(event.target.value as PasswordFieldProps['size'])
        }
      >
        <option value="">Defaul</option>
        <option value="small">Small</option>
        <option value="large">Large</option>
      </SelectField>

      <TextField
        label="value"
        name="value"
        id="value"
        placeholder="set value"
        value={value}
        onChange={(event) => {
          setValue(event.target.value as PasswordFieldProps['value']);
        }}
      />

      <SelectField
        name="variation"
        id="variation"
        label="variation"
        value={variation}
        onChange={(event) =>
          setVariation(event.target.value as PasswordFieldProps['variation'])
        }
      >
        <option value="">Defaul</option>
        <option value="quiet">Quiet</option>
      </SelectField>

      <SwitchField
        label="hideShowPassword"
        defaultChecked={hideShowPassword}
        labelPosition="end"
        onChange={(event) => {
          setHideShowPassword(
            event.target.checked as PasswordFieldProps['hideShowPassword']
          );
        }}
      />
    </Flex>
  );
};
