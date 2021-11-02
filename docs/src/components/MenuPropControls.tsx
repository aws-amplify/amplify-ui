import React from 'react';
import { MenuProps, SelectField, TextField } from '@aws-amplify/ui-react';
import { DemoBox } from './DemoBox';

export interface MenuPropControlsProps extends MenuProps {
  setAlign: (value: React.SetStateAction<MenuProps['align']>) => void;
  setSize: (value: React.SetStateAction<MenuProps['size']>) => void;
}

interface MenuPropControlsInterface {
  (props: MenuPropControlsProps): JSX.Element;
}

export const MenuPropControls: MenuPropControlsInterface = ({
  setAlign,
  setSize,
  align,
  size,
}) => {
  return (
    <DemoBox primitiveName="Menu">
      <SelectField
        label="align"
        name="align"
        onChange={(event) => setAlign(event.target.value as MenuProps['align'])}
      >
        <option value="start">start</option>
        <option value="center">center</option>
        <option value="end">end</option>
      </SelectField>

      <SelectField
        label="size"
        name="size"
        placeholder="default"
        onChange={(event) => setSize(event.target.value as MenuProps['size'])}
      >
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
    </DemoBox>
  );
};
