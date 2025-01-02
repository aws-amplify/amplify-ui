import {
  AlertProps,
  TextField,
  SelectField,
  SwitchField,
  Flex,
} from '@aws-amplify/ui-react';
import * as React from 'react';

export interface AlertPropControlsProps extends AlertProps {
  setVariation: (value: React.SetStateAction<AlertProps['variation']>) => void;
  setIsDismissible: (
    value: React.SetStateAction<AlertProps['isDismissible']>
  ) => void;
  setHasIcon: (value: React.SetStateAction<AlertProps['hasIcon']>) => void;
  setHeading: (value: React.SetStateAction<AlertProps['heading']>) => void;
  setBody: (value: React.SetStateAction<string>) => void;
  body: string;
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
  return (
    <Flex direction="column">
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
        isChecked={isDismissible}
        labelPosition="end"
        onChange={(event) => {
          setIsDismissible(event.target.checked as AlertProps['isDismissible']);
        }}
      />

      <SwitchField
        label="hasIcon"
        isChecked={hasIcon}
        labelPosition="end"
        onChange={(event) =>
          setHasIcon(event.target.checked as AlertProps['hasIcon'])
        }
      />
    </Flex>
  );
};
