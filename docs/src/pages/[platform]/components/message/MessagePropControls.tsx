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
}

interface MessagePropControlsInterface {
  (props: MessagePropControlsProps): JSX.Element;
}

export const MessagePropControls: MessagePropControlsInterface = ({
  colorTheme,
  variation,
  setColorTheme,
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
    </Flex>
  );
};
