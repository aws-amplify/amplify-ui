import * as React from 'react';
import {
  Button,
  Flex,
  TextField,
  SelectField,
  SwitchField,
  SwitchFieldProps,
} from '@aws-amplify/ui-react';

export interface SwitchPropControlsProps extends SwitchFieldProps {
  setThumbColor: (
    value: React.SetStateAction<SwitchFieldProps['thumbColor']>
  ) => void;
  setTrackColor: (
    value: React.SetStateAction<SwitchFieldProps['trackColor']>
  ) => void;
  setTrackCheckedColor: (
    value: React.SetStateAction<SwitchFieldProps['trackCheckedColor']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<SwitchFieldProps['isDisabled']>
  ) => void;
  setSize: (value: React.SetStateAction<SwitchFieldProps['size']>) => void;
  setLabel: (value: React.SetStateAction<SwitchFieldProps['label']>) => void;
  setIsChecked: (
    value: React.SetStateAction<SwitchFieldProps['isChecked']>
  ) => void;
  setLabelPosition: (
    value: React.SetStateAction<SwitchFieldProps['labelPosition']>
  ) => void;
}

interface SwitchPropControlsInterface {
  (props: SwitchPropControlsProps): JSX.Element;
}

export const SwitchPropControls: SwitchPropControlsInterface = ({
  thumbColor,
  setThumbColor,
  trackColor,
  setTrackColor,
  trackCheckedColor,
  setTrackCheckedColor,
  isDisabled,
  setIsDisabled,
  size,
  setSize,
  label,
  setLabel,
  labelPosition,
  setLabelPosition,
  isChecked,
  setIsChecked,
}) => {
  return (
    <Flex direction="column">
      <TextField
        placeholder="Set thumb color"
        name="thumbColor"
        value={thumbColor as string}
        onChange={(event: any) => {
          setThumbColor(event.target.value);
        }}
        label="thumbColor"
      />
      <TextField
        placeholder="Set track color"
        name="trackColor"
        value={trackColor as string}
        onChange={(event: any) => {
          setTrackColor(event.target.value);
        }}
        label="trackColor"
      />
      <TextField
        placeholder="Set checked track color"
        name="trackCheckedColor"
        value={trackCheckedColor as string}
        onChange={(event: any) => {
          setTrackCheckedColor(event.target.value);
        }}
        label="trackCheckedColor"
      />
      <SelectField
        name="size"
        value={size}
        placeholder="default"
        onChange={(event) =>
          setSize(event.target.value as SwitchFieldProps['size'])
        }
        label="size"
      >
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
      <TextField
        placeholder="Set switchfield label"
        name="label"
        value={label as string}
        onChange={(event: any) => {
          setLabel(event.target.value);
        }}
        label="label"
      />
      <SelectField
        name="labelPosition"
        value={labelPosition}
        onChange={(event) =>
          setLabelPosition(
            event.target.value as SwitchFieldProps['labelPosition']
          )
        }
        label="labelPosition"
      >
        <option value="start">start</option>
        <option value="end">end</option>
        <option value="top">top</option>
        <option value="bottom">bottom</option>
      </SelectField>
      <SwitchField
        name="isDisabled"
        onChange={() => {
          setIsDisabled(!isDisabled);
        }}
        label="isDisabled"
      />
      <Flex>
        <SwitchField
          name="isChecked"
          onChange={() => {
            setIsChecked(!isChecked);
          }}
          label="isChecked"
        />
        <Button
          variation="link"
          onClick={() => setIsChecked(undefined)}
          textAlign="left"
        >
          Unset
        </Button>
      </Flex>
    </Flex>
  );
};
