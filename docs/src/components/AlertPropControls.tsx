import React from 'react';
import { AlertProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface AlertPropControlsProps extends AlertProps {
  setVariation: (value: React.SetStateAction<AlertProps['variation']>) => void;
  setIsDismissible: (
    value: React.SetStateAction<AlertProps['isDismissible']>
  ) => void;
  setIconSize: (value: React.SetStateAction<AlertProps['iconSize']>) => void;
  setHasIcon: (value: React.SetStateAction<AlertProps['hasIcon']>) => void;
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
  iconSize,
  setIconSize,
  hasIcon,
  setHasIcon,
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

      <FieldLabeler id="hasIcon">
        <input
          name="hasIcon"
          id="hasIcon"
          type="checkbox"
          checked={hasIcon}
          onChange={(event) =>
            setHasIcon(event.target.checked as AlertProps['hasIcon'])
          }
        />
      </FieldLabeler>

      <FieldLabeler id="iconSize">
        <select
          name="iconSize"
          id="iconSize"
          value={iconSize}
          onChange={(event) =>
            setIconSize(event.target.value as AlertProps['iconSize'])
          }
        >
          <option value="">default</option>
          <option value="small">small</option>
          <option value="large">large</option>
        </select>
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
