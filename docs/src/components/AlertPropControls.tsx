import React from 'react';
import { AlertProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface AlertPropControlsProps extends AlertProps {
  setVariation: (value: React.SetStateAction<AlertProps['variation']>) => void;
  setIsDismissible: (
    value: React.SetStateAction<AlertProps['isDismissible']>
  ) => void;
  setWithIcon: (value: React.SetStateAction<AlertProps['withIcon']>) => void;
  setTitle: (value: React.SetStateAction<AlertProps['title']>) => void;
}

interface AlertPropControlsInterface {
  (props: AlertPropControlsProps): JSX.Element;
}

export const AlertPropControls: AlertPropControlsInterface = ({
  variation,
  setVariation,
  isDismissible,
  setIsDismissible,
  withIcon,
  setWithIcon,
  title,
  setTitle,
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

      <FieldLabeler id="isDismissible">
        <input
          name="isDismissible"
          id="isDismissible"
          type="checkbox"
          checked={isDismissible}
          onChange={(event) =>
            setIsDismissible(
              event.target.checked as AlertProps['isDismissible']
            )
          }
        />
      </FieldLabeler>

      <FieldLabeler id="withIcon">
        <input
          name="withIcon"
          id="withIcon"
          type="checkbox"
          checked={withIcon}
          onChange={(event) =>
            setWithIcon(event.target.checked as AlertProps['withIcon'])
          }
        />
      </FieldLabeler>

      <FieldLabeler id="title">
        <input
          name="title"
          id="title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value as AlertProps['title'])
          }
        />
      </FieldLabeler>
    </DemoBox>
  );
};
