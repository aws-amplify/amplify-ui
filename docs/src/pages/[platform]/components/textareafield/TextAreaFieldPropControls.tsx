import * as React from 'react';
import {
  Flex,
  TextField,
  SelectField,
  SwitchField,
  BaseTextAreaFieldProps,
} from '@aws-amplify/ui-react';

export interface TextAreaFieldControlsProps extends BaseTextAreaFieldProps {
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
  setLabel: (
    value: React.SetStateAction<BaseTextAreaFieldProps['label']>
  ) => void;
  setLabelHidden: (
    value: React.SetStateAction<BaseTextAreaFieldProps['labelHidden']>
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
  setVariation: (
    value: React.SetStateAction<BaseTextAreaFieldProps['variation']>
  ) => void;
}

interface TextAreaFieldControlsInterface {
  (props: TextAreaFieldControlsProps): React.JSX.Element;
}

export const TextAreaFieldPropControls: TextAreaFieldControlsInterface = ({
  descriptiveText,
  errorMessage,
  hasError,
  isDisabled,
  isReadOnly,
  label,
  labelHidden,
  name,
  placeholder,
  rows,
  setDescriptiveText,
  setErrorMessage,
  setHasError,
  setIsDisabled,
  setIsReadOnly,
  setLabel,
  setLabelHidden,
  setName,
  setPlaceholder,
  setRows,
  setSize,
  setVariation,
  size,
  variation,
}) => {
  return (
    <Flex direction="column">
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
        value={errorMessage as string}
        onChange={(event: any) => {
          setErrorMessage(event.target.value);
        }}
        label="errorMessage"
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
