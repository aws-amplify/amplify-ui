import React from 'react';
import { LinkProps, BaseStyleProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface LinkPropControlsProps extends LinkProps, BaseStyleProps {
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
    <DemoBox primitiveName="Link">
      <FieldLabeler id="isExternal">
        <input
          name="isExternal"
          id="isExternal"
          value={isExternal as unknown as string}
          type="checkbox"
          onChange={(event) =>
            setIsExternal(event.target.checked as LinkProps['isExternal'])
          }
        />
      </FieldLabeler>

      <FieldLabeler id="color">
        <input
          name="color"
          id="color"
          value={color as string}
          type="text"
          onChange={(event) =>
            setColor(event.target.value as LinkProps['color'])
          }
        />
      </FieldLabeler>
      <FieldLabeler id="textDecoration">
        <input
          name="textDecoration"
          id="textDecoration"
          value={textDecoration as string}
          type="text"
          onChange={(event) =>
            setTextDecoration(event.target.value as LinkProps['textDecoration'])
          }
        />
      </FieldLabeler>
    </DemoBox>
  );
};
