import * as React from 'react';
import {
  Flex,
  ToggleButtonProps,
  SelectField,
  SwitchField,
} from '@aws-amplify/ui-react';

export interface ToggleButtonPropControlsProps extends ToggleButtonProps {
  setIsDisabled: (
    value: React.SetStateAction<ToggleButtonProps['isDisabled']>
  ) => void;
  setSize: (value: React.SetStateAction<ToggleButtonProps['size']>) => void;
  setVariation: (
    value: React.SetStateAction<ToggleButtonProps['variation']>
  ) => void;
}

export interface ToggleButtonPropControlsInterface {
  (props: ToggleButtonPropControlsProps): React.JSX.Element;
}

export const ToggleButtonPropControls: ToggleButtonPropControlsInterface = ({
  isDisabled,
  setIsDisabled,
  size,
  setSize,
  variation,
  setVariation,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        label="variation"
        value={variation}
        placeholder="default"
        onChange={(event) =>
          setVariation(event.target.value as ToggleButtonProps['variation'])
        }
      >
        <option value="primary">primary</option>
        <option value="link">link</option>
      </SelectField>

      <SelectField
        value={size}
        label="size"
        placeholder="default"
        onChange={(event) =>
          setSize(event.target.value as ToggleButtonProps['size'])
        }
      >
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
      <SwitchField
        isChecked={isDisabled}
        onChange={(event) => setIsDisabled(event.target.checked)}
        label="isDisabled"
        labelPosition="end"
      />
    </Flex>
  );
};
