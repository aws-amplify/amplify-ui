import React from 'react';

import {
  CheckboxField,
  ToggleButtonProps,
  SelectField,
} from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

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
  (props: ToggleButtonPropControlsProps): JSX.Element;
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
    <DemoBox primitiveName="ToggleButton">
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
        onChange={(event) =>
          setSize(event.target.value as ToggleButtonProps['size'])
        }
      >
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </SelectField>
      <CheckboxField
        name="isDisabled"
        value="yes"
        checked={isDisabled}
        onChange={(event) => setIsDisabled(event.target.checked)}
        label="isDisabled"
      />
    </DemoBox>
  );
};
