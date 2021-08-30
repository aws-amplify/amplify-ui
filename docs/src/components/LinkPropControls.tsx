import React from 'react';
import { LinkOptions, BaseStyleProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface LinkPropControlsProps extends LinkOptions, BaseStyleProps {
  setColor: (value: React.SetStateAction<LinkOptions['color']>) => void;
  setIsExternal: (
    value: React.SetStateAction<LinkOptions['isExternal']>
  ) => void;
  setSize: (value: React.SetStateAction<LinkOptions['size']>) => void;
  setTextDecoration: (
    value: React.SetStateAction<LinkOptions['textDecoration']>
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
  size,
  setSize,
  textDecoration,
  setTextDecoration,
}) => {
  return (
    <DemoBox primitiveName="Link">
      <FieldLabeler id="isExternal">
        <input
          name="isExternal"
          id="isExternal"
          value={isExternal}
          type="checkbox"
          onChange={(event) =>
            setIsExternal(event.target.checked as LinkOptions['isExternal'])
          }
        />
      </FieldLabeler>
      <FieldLabeler id="size">
        <select
          name="size"
          id="size"
          value={size}
          onChange={(event) =>
            setSize(event.target.value as LinkOptions['size'])
          }
        >
          <option value="">default</option>
          <option value="small">small</option>
          <option value="large">large</option>
        </select>
      </FieldLabeler>

      <FieldLabeler id="color">
        <input
          name="color"
          id="color"
          value={color}
          type="text"
          onChange={(event) =>
            setColor(event.target.value as LinkOptions['color'])
          }
        />
      </FieldLabeler>
      <FieldLabeler id="textDecoration">
        <input
          name="textDecoration"
          id="textDecoration"
          value={textDecoration}
          type="text"
          onChange={(event) =>
            setTextDecoration(
              event.target.value as LinkOptions['textDecoration']
            )
          }
        />
      </FieldLabeler>
    </DemoBox>
  );
};
