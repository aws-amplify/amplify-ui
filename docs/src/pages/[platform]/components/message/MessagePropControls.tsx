import {
  MessageProps,
  Message,
  TextField,
  SelectField,
  SwitchField,
  Flex,
} from '@aws-amplify/ui-react';
import * as React from 'react';

export interface MessagePropControlsProps extends MessageProps {
  setVariation: (
    value: React.SetStateAction<MessageProps['variation']>
  ) => void;
  setColorTheme: (
    value: React.SetStateAction<MessageProps['colorTheme']>
  ) => void;
  setChildren: (value: React.SetStateAction<MessageProps['children']>) => void;
  setHeading: (value: React.SetStateAction<MessageProps['heading']>) => void;
  setIsDismissible: (
    value: React.SetStateAction<MessageProps['isDismissible']>
  ) => void;
  setHasIcon: (value: React.SetStateAction<MessageProps['hasIcon']>) => void;
}

interface MessagePropControlsInterface {
  (props: MessagePropControlsProps): JSX.Element;
}

export const MessagePropControls: MessagePropControlsInterface = ({
  colorTheme,
  children,
  hasIcon,
  heading,
  isDismissible,
  variation,
  setColorTheme,
  setChildren,
  setHasIcon,
  setHeading,
  setIsDismissible,
  setVariation,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        label="variation"
        value={variation}
        onChange={(event) =>
          setVariation(event.target.value as MessageProps['variation'])
        }
      >
        <option value="filled">filled (default)</option>
        <option value="outlined">outlined</option>
        <option value="plain">plain</option>
      </SelectField>
      <SelectField
        label="colorTheme"
        value={colorTheme}
        onChange={(event) =>
          setColorTheme(event.target.value as MessageProps['colorTheme'])
        }
      >
        <option value="neutral">neutral (default)</option>
        <option value="error">error</option>
        <option value="success">success</option>
        <option value="warning">warning</option>
        <option value="info">info</option>
      </SelectField>
      <TextField
        label="Body"
        value={children as string}
        onChange={(event) =>
          setChildren(event.target.value as MessageProps['children'])
        }
      />
      <TextField
        label="Heading"
        value={heading as string}
        onChange={(event) =>
          setHeading(event.target.value as MessageProps['heading'])
        }
      />
      <SwitchField
        label="isDismissible"
        isChecked={isDismissible}
        labelPosition="end"
        onChange={(event) => {
          setIsDismissible(
            event.target.checked as MessageProps['isDismissible']
          );
        }}
      />
      <SwitchField
        label="hasIcon"
        isChecked={hasIcon}
        labelPosition="end"
        onChange={(event) =>
          setHasIcon(event.target.checked as MessageProps['hasIcon'])
        }
      />
    </Flex>
  );
};
