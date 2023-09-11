import {
  InputProps,
  TextField,
  SelectField,
  SwitchField,
  Flex,
} from '@aws-amplify/ui-react';
import * as React from 'react';

export interface InputPropControlsProps extends InputProps {
  setVariation: (value: React.SetStateAction<InputProps['variation']>) => void;
  setSize: (value: React.SetStateAction<InputProps['size']>) => void;
  setPlaceholder: (
    value: React.SetStateAction<InputProps['placeholder']>
  ) => void;
  setHasError: (value: React.SetStateAction<InputProps['hasError']>) => void;
  setIsDisabled: (
    value: React.SetStateAction<InputProps['isDisabled']>
  ) => void;
}

interface InputPropControlsInterface {
  (props: InputPropControlsProps): JSX.Element;
}

export const InputPropControls: InputPropControlsInterface = ({
  variation,
  setVariation,
  size,
  setSize,
  placeholder,
  setPlaceholder,
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
          setVariation(event.target.value as InputProps['variation'])
        }
      >
        <option value="">default</option>
        <option value="quiet">quiet</option>
      </SelectField>

      <SelectField
        label="size"
        value={size}
        defaultValue="default"
        onChange={(event) => setSize(event.target.value as InputProps['size'])}
      >
        <option value="small">small</option>
        <option value="default">default</option>
        <option value="large">large</option>
      </SelectField>

      <TextField
        label="placeholder"
        value={placeholder as string}
        onChange={(event) =>
          setPlaceholder(event.target.value as InputProps['placeholder'])
        }
      />

      <SwitchField
        label="hasError"
        isChecked={hasError}
        labelPosition="end"
        onChange={(event) => {
          setHasError(event.target.checked as InputProps['hasError']);
        }}
      />

      <SwitchField
        label="isDisabled"
        isChecked={isDisabled}
        labelPosition="end"
        onChange={(event) => {
          setIsDisabled(event.target.checked as InputProps['isDisabled']);
        }}
      />
    </Flex>
  );
};
