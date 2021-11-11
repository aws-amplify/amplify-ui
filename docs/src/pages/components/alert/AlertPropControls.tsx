import {
  AlertProps,
  TextField,
  SelectField,
  SwitchField,
  View,
  useTheme,
} from '@aws-amplify/ui-react';

export interface AlertPropControlsProps extends AlertProps {
  setVariation: (value: React.SetStateAction<AlertProps['variation']>) => void;
  setIsDismissible: (
    value: React.SetStateAction<AlertProps['isDismissible']>
  ) => void;
  setIconSize: (value: React.SetStateAction<AlertProps['iconSize']>) => void;
  setHasIcon: (value: React.SetStateAction<AlertProps['hasIcon']>) => void;
  setHeading: (value: React.SetStateAction<AlertProps['heading']>) => void;
  setHeadingLevel: (
    value: React.SetStateAction<AlertProps['headingLevel']>
  ) => void;
}

interface AlertPropControlsInterface {
  (props: AlertPropControlsProps): JSX.Element;
}

export const AlertPropControls: AlertPropControlsInterface = ({
  variation,
  setVariation,
  isDismissible,
  setIsDismissible,
  hasIcon,
  setHasIcon,
  heading,
  setHeading,
  body,
  setBody,
}) => {
  const { tokens } = useTheme();
  return (
    <View padding={`${tokens.space.medium} 0`}>
      <SelectField
        name="variation"
        id="variation"
        label="Variation"
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
      </SelectField>

      <TextField
        label="Heading"
        value={heading as string}
        onChange={(event) =>
          setHeading(event.target.value as AlertProps['heading'])
        }
      />

      <TextField
        label="Body"
        value={body as string}
        onChange={(event) => setBody(event.target.value)}
      />

      <SwitchField
        label="isDismissable"
        defaultChecked={isDismissible}
        labelPosition="end"
        onChange={(event) => {
          setIsDismissible(event.target.checked as AlertProps['isDismissible']);
        }}
      />

      <SwitchField
        label="hasIcon"
        defaultChecked={hasIcon}
        labelPosition="end"
        onChange={(event) =>
          setHasIcon(event.target.checked as AlertProps['hasIcon'])
        }
      />
    </View>
  );
};
