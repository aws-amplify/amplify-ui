import * as React from 'react';
import { Flex, TextField, SwitchField, LinkProps } from '@aws-amplify/ui-react';

export interface LinkPropControlsProps extends LinkProps {
  setColor: (value: React.SetStateAction<LinkProps['color']>) => void;
  setIsExternal: (value: React.SetStateAction<LinkProps['isExternal']>) => void;
  setTextDecoration: (
    value: React.SetStateAction<LinkProps['textDecoration']>
  ) => void;
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
}) => {
  return (
    <Flex direction="column">
      <TextField
        value={color as string}
        onChange={(e) => setColor(e.target.value)}
        label="color"
      />
      <TextField
        value={textDecoration as string}
        onChange={(e) => setTextDecoration(e.target.value)}
        label="textDecoration"
      />
      <SwitchField
        checked={isExternal}
        onChange={(e) => setIsExternal(e.target.checked)}
        label="isExternal"
      />
    </Flex>
  );
};
