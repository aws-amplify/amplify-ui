import React from 'react';
import { BadgeProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface BadgePropControlsProps extends BadgeProps {
  setVariation: (value: React.SetStateAction<BadgeProps['variation']>) => void;
  setSize: (value: React.SetStateAction<BadgeProps['size']>) => void;
}

interface BadgePropControlsInterface {
  (props: BadgePropControlsProps): JSX.Element;
}

export const BadgePropControls: BadgePropControlsInterface = ({
  variation,
  setVariation,
  size,
  setSize,
}) => {
  return (
    <DemoBox primitiveName="Badge">
      <FieldLabeler id="variation">
        <select
          name="variation"
          id="variation"
          value={variation}
          onChange={(event) =>
            setVariation(event.target.value as BadgeProps['variation'])
          }
        >
          <option value="">default</option>
          <option value="info">info</option>
          <option value="error">error</option>
          <option value="warning">warning</option>
          <option value="success">success</option>
        </select>
      </FieldLabeler>

      <FieldLabeler id="size">
        <select
          name="size"
          id="size"
          value={size}
          onChange={(event) =>
            setSize(event.target.value as BadgeProps['size'])
          }
        >
          <option value="">default</option>
          <option value="small">small</option>
          <option value="large">large</option>
        </select>
      </FieldLabeler>
    </DemoBox>
  );
};
