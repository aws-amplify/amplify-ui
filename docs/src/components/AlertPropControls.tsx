import React from 'react';
import { AlertProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface AlertPropControlsProps extends AlertProps {
  setVariation: (value: React.SetStateAction<AlertProps['variation']>) => void;
}

interface AlertPropControlsInterface {
  (props: AlertPropControlsProps): JSX.Element;
}

export const AlertPropControls: AlertPropControlsInterface = ({
  variation,
  setVariation,
}) => {
  return (
    <DemoBox primitiveName="Alert">
      <FieldLabeler id="variation">
        <select
          name="variation"
          id="variation"
          value={variation}
          onChange={(event) =>
            setVariation(event.target.value as AlertProps['variation'])
          }
        >
          <option value="">default</option>
          <option value="info">info</option>
          <option value="error">error</option>
          <option value="warning">warning</option>
          <option value="success">success</option>
        </select>
      </FieldLabeler>
    </DemoBox>
  );
};
