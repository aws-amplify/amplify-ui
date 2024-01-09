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
  setHideIcon: (value: React.SetStateAction<LinkProps['hideIcon']>) => void;
  setLinkIconPosition: (
    value: React.SetStateAction<LinkProps['linkIconPosition']>
  ) => void;
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
  hideIcon,
  setHideIcon,
  linkIconPosition,
  setLinkIconPosition,
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
        <option value="underline overline #ff3028">
          underline overline #ff3028
        </option>
        <option value="underline dotted">underline dotted</option>
        <option value="underline dotted red">underline dotted red</option>
        <option value="green wavy underline">green wavy underline</option>
      </SelectField>
      <SwitchField
        checked={isExternal}
        onChange={(e) => {
          setIsExternal(e.target.checked);
          setHideIcon(false);
          setLinkIconPosition('right');
        }}
        label="isExternal"
      />

      {isExternal ? (
        <>
          <SwitchField
            checked={hideIcon}
            onChange={(e) => setHideIcon(e.target.checked)}
            label="hideIcon"
          />

          {!hideIcon ? (
            <SelectField
              value={linkIconPosition as string}
              onChange={(event) =>
                setLinkIconPosition(event.target.value as string)
              }
              label="linkIconPosition"
            >
              <option value="left">left</option>
              <option value="right">right</option>
            </SelectField>
          ) : null}
        </>
      ) : null}
    </Flex>
  );
};
