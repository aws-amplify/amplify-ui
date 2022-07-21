import * as React from 'react';
import {
  Flex,
  TextField,
  SwitchField,
  SelectField,
  LinkProps,
} from '@aws-amplify/ui-react';

export interface LinkPropControlsProps extends LinkProps {
  setColor: (value: React.SetStateAction<LinkProps['color']>) => void;
  setIsExternal: (value: React.SetStateAction<LinkProps['isExternal']>) => void;
  setTextDecoration: (
    value: React.SetStateAction<LinkProps['textDecoration']>
  ) => void;
  setChildren: (value: React.SetStateAction<LinkProps['children']>) => void;
}

interface LinkPropControlsInterface {
  (props: LinkPropControlsProps): JSX.Element;
}

export const LinkPropControls: LinkPropControlsInterface = ({
  color,
  setColor,
  isExternal,
  setIsExternal,
  textDecoration,
  setTextDecoration,
  children,
  setChildren,
}) => {
  return (
    <Flex direction="column">
      <TextField
        value={children as string}
        onChange={(event) => setChildren(event.target.value)}
        label="children"
      />
      <TextField
        value={color as string}
        onChange={(e) => setColor(e.target.value)}
        label="color"
      />
      <SelectField
        value={textDecoration as string}
        onChange={(event) => setTextDecoration(event.target.value)}
        label="textDecoration"
      >
        <option value="none">none</option>
        <option value="underline">underline</option>
        <option value="underline overline #FF3028">
          underline overline #FF3028
        </option>
        <option value="underline dotted">underline dotted</option>
        <option value="underline dotted red">underline dotted red</option>
        <option value="green wavy underline">green wavy underline</option>
      </SelectField>
      <SwitchField
        checked={isExternal}
        onChange={(e) => setIsExternal(e.target.checked)}
        label="isExternal"
      />
    </Flex>
  );
};
