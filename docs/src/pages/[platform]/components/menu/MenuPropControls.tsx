import * as React from 'react';
import { Flex, MenuProps, SelectField, TextField } from '@aws-amplify/ui-react';

export interface MenuPropControlsProps extends MenuProps {
  setMenuAlign: (value: React.SetStateAction<MenuProps['menuAlign']>) => void;
  setSize: (value: React.SetStateAction<MenuProps['size']>) => void;
}

interface MenuPropControlsInterface {
  (props: MenuPropControlsProps): JSX.Element;
}

export const MenuPropControls: MenuPropControlsInterface = ({
  setMenuAlign,
  setSize,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        label="menuAlign"
        name="menuAlign"
        onChange={(event) =>
          setMenuAlign(event.target.value as MenuProps['menuAlign'])
        }
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
    </Flex>
  );
};
