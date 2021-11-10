import { useState } from 'react';
import {
  AlertProps,
  TextField,
  SelectField,
  SwitchField,
  defaultTheme,
  Heading,
  View,
  useTheme,
} from '@aws-amplify/ui-react';

export interface AlertThemeControlsProps {
  backgroundColor: string;
  setBackgroundColor: (value: React.SetStateAction<string>) => void;
  paddingVertical: string;
  setPaddingVertical: (value: React.SetStateAction<string>) => void;
  paddingHorizontal: string;
  setPaddingHorizontal: (value: React.SetStateAction<string>) => void;
  infoBackgroundColor: string;
  setInfoBackgroundColor: (value: React.SetStateAction<string>) => void;
}

interface AlertPropControlsInterface {
  (props: AlertThemeControlsProps): JSX.Element;
}

interface AlertThemeProps {
  backgroundColor: string;
  paddingVertical: string;
  paddingHorizontal: string;
  info: {
    backgroundColor: string;
  };
}

interface UseAlertThemeProps {
  (initialValues: AlertThemeProps): AlertThemeControlsProps;
}

export const useAlertThemeProps: UseAlertThemeProps = (initialValues) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(
    initialValues.backgroundColor
  );
  const [paddingHorizontal, setPaddingHorizontal] = useState<string>(
    initialValues.paddingHorizontal
  );
  const [paddingVertical, setPaddingVertical] = useState<string>(
    initialValues.paddingVertical
  );
  const [infoBackgroundColor, setInfoBackgroundColor] = useState<string>(
    initialValues.info.backgroundColor
  );

  return {
    backgroundColor,
    setBackgroundColor,
    infoBackgroundColor,
    setInfoBackgroundColor,
    paddingHorizontal,
    setPaddingHorizontal,
    paddingVertical,
    setPaddingVertical,
  };
};

export const AlertThemeControls: AlertPropControlsInterface = ({
  backgroundColor,
  setBackgroundColor,
  paddingHorizontal,
  setPaddingHorizontal,
  paddingVertical,
  setPaddingVertical,
  infoBackgroundColor,
  setInfoBackgroundColor,
}) => {
  const { tokens } = useTheme();
  return (
    <View padding={`${tokens.space.medium} 0`}>
      <Heading level={6}>Default</Heading>
      <TextField
        label="Background color"
        value={backgroundColor}
        onChange={(event) => setBackgroundColor(event.target.value)}
      />
      <TextField
        label="Padding vertical"
        value={paddingVertical}
        onChange={(event) => setPaddingVertical(event.target.value)}
      />
      <TextField
        label="Padding horizontal"
        value={paddingHorizontal}
        onChange={(event) => setPaddingHorizontal(event.target.value)}
      />

      <Heading level={6}>Info</Heading>
      <TextField
        label="Background color"
        value={infoBackgroundColor}
        onChange={(event) => setInfoBackgroundColor(event.target.value)}
      />

      <Heading level={6}>Warning</Heading>
    </View>
  );
};
