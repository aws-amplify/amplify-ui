import { useState } from 'react';
import {
  AlertProps,
  TextField,
  SelectField,
  SwitchField,
} from '@aws-amplify/ui-react';

export interface AlertThemeControlsProps {
  backgroundColor: string;
  setBackgroundColor: (value: React.SetStateAction<string>) => void;
}

interface AlertPropControlsInterface {
  (props: AlertThemeControlsProps): JSX.Element;
}

interface AlertThemeProps {
  backgroundColor: string;
}

interface UseAlertThemeProps {
  (initialValues: AlertThemeProps): AlertThemeControlsProps;
}

export const useAlertThemeProps: UseAlertThemeProps = (initialValues) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(
    initialValues.backgroundColor
  );

  return { backgroundColor, setBackgroundColor };
};

export const AlertThemeControls: AlertPropControlsInterface = ({
  backgroundColor,
  setBackgroundColor,
}) => {
  return (
    <>
      <TextField
        label="heading"
        value={backgroundColor}
        onChange={(event) => setBackgroundColor(event.target.value)}
      />
    </>
  );
};
