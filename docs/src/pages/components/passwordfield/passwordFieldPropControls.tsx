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

export const PasswordFieldPropControls: PasswordFieldPropControlsInterface = (
  props
) => {
  return (
    <Flex direction="column">
      <SelectField
        name="autoComplete"
        id="autoComplete"
        label="autoComplete"
        value={props.autoComplete}
        onChange={(event) => props.setAutoComplete(event.target.value)}
      >
        <option value="current-password">current-password</option>
        <option value="new-password">new-password</option>
      </SelectField>

      <TextField
        label="defaultValue"
        name="defaultValue"
        id="defaultValue"
        placeholder="set defaultValue"
        value={props.defaultValue}
        onChange={(event) => {
          props.setDefaultValue(
            event.target.value as PasswordFieldProps['defaultValue']
          );
        }}
      />

      <TextField
        label="descriptiveText"
        name="descriptiveText"
        id="descriptiveText"
        placeholder="set descriptiveText"
        value={props.descriptiveText as string}
        onChange={(event) => {
          props.setDescriptiveText(
            event.target.value as PasswordFieldProps['descriptiveText']
          );
        }}
      />

      <TextField
        label="errorMessage"
        name="errorMessage"
        id="errorMessage"
        placeholder="set errorMessage"
        value={props.errorMessage}
        onChange={(event) => {
          props.setErrorMessage(
            event.target.value as PasswordFieldProps['errorMessage']
          );
        }}
      />

      <SwitchField
        label="hasError"
        defaultChecked={props.hasError}
        labelPosition="end"
        onChange={(event) => {
          props.setHasError(
            event.target.checked as PasswordFieldProps['hasError']
          );
        }}
      />

      <SelectField
        name="inputMode"
        id="inputMode"
        label="inputMode"
        value={props.inputMode}
        onChange={(event) =>
          props.setInputMode(
            event.target.value as PasswordFieldProps['inputMode']
          )
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
        defaultChecked={props.isDisabled}
        labelPosition="end"
        onChange={(event) => {
          props.setIsDisabled(
            event.target.checked as PasswordFieldProps['isDisabled']
          );
        }}
      />

      <SwitchField
        label="isReadOnly"
        defaultChecked={props.isReadOnly}
        labelPosition="end"
        onChange={(event) => {
          props.setIsReadOnly(
            event.target.checked as PasswordFieldProps['isReadOnly']
          );
        }}
      />

      <SwitchField
        label="isRequired"
        defaultChecked={props.isRequired}
        labelPosition="end"
        onChange={(event) => {
          props.setIsRequired(
            event.target.checked as PasswordFieldProps['isRequired']
          );
        }}
      />

      <TextField
        label="label"
        name="label"
        id="label"
        placeholder="set label"
        value={props.label as string}
        onChange={(event) => {
          props.setLabel(event.target.value as PasswordFieldProps['label']);
        }}
      />

      <SwitchField
        label="labelHidden"
        defaultChecked={props.labelHidden}
        labelPosition="end"
        onChange={(event) => {
          props.setLabelHidden(
            event.target.checked as PasswordFieldProps['labelHidden']
          );
        }}
      />

      <TextField
        label="name"
        name="name"
        id="name"
        placeholder="set name"
        value={props.name}
        onChange={(event) => {
          props.setName(event.target.value as PasswordFieldProps['name']);
        }}
      />

      <TextField
        label="placeholder"
        name="placeholder"
        id="placeholder"
        placeholder="set placeholder"
        value={props.placeholder}
        onChange={(event) => {
          props.setPlaceholder(
            event.target.value as PasswordFieldProps['placeholder']
          );
        }}
      />

      <SelectField
        name="size"
        id="size"
        label="size"
        value={props.size}
        onChange={(event) =>
          props.setSize(event.target.value as PasswordFieldProps['size'])
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
        value={props.value}
        onChange={(event) => {
          props.setValue(event.target.value as PasswordFieldProps['value']);
        }}
      />

      <SelectField
        name="variation"
        id="variation"
        label="variation"
        value={props.variation}
        onChange={(event) =>
          props.setVariation(
            event.target.value as PasswordFieldProps['variation']
          )
        }
      >
        <option value="">Defaul</option>
        <option value="quiet">Quiet</option>
      </SelectField>

      <SwitchField
        label="hideShowPassword"
        defaultChecked={props.hideShowPassword}
        labelPosition="end"
        onChange={(event) => {
          props.setHideShowPassword(
            event.target.checked as PasswordFieldProps['hideShowPassword']
          );
        }}
      />

      {/* alignContent={alignContent as FlexContainerStyleProps['alignContent']}
        alignItems={alignItems as FlexContainerStyleProps['alignItems']}
        autoComplete={autoComplete as TextFieldProps['autoComplete']}
        descriptiveText={descriptiveText as TextFieldProps['descriptiveText']}
        defaultValue={defaultValue as TextFieldProps['defaultValue']}
        direction={direction as FlexContainerStyleProps['direction']}
        errorMessage={errorMessage as TextFieldProps['errorMessage']}
        gap={gap as FlexContainerStyleProps['gap']}
        hasError={hasError as unknown as boolean}
        inputMode={inputMode as TextFieldProps['inputMode']}
        isDisabled={isDisabled as unknown as boolean}
        isReadOnly={isReadOnly as unknown as boolean}
        isRequired={isRequired as unknown as boolean}
        justifyContent={
          justifyContent as FlexContainerStyleProps['justifyContent']
        }
        label={label as TextFieldProps['label']}
        labelHidden={labelHidden as unknown as boolean}
        name={name as TextFieldProps['name']}
        placeholder={placeholder as TextFieldProps['placeholder']}
        size={size as TextFieldProps['size']}
        variation={variation as TextFieldProps['variation']}
        wrap={wrap as FlexContainerStyleProps['wrap']}
        hideShowPassword={
          hideShowPassword as unknown as PasswordFieldProps['hideShowPassword']
        } */}
    </Flex>
  );
};
