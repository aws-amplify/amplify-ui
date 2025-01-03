import * as React from 'react';
import {
  BadgeProps,
  SelectField,
  TextField,
  Flex,
} from '@aws-amplify/ui-react';

export interface BadgePropControlsProps extends BadgeProps {
  setVariation: (value: React.SetStateAction<BadgeProps['variation']>) => void;
  setSize: (value: React.SetStateAction<BadgeProps['size']>) => void;
  body: string;
  setBody: (value: React.SetStateAction<string>) => void;
}

interface BadgePropControlsInterface {
  (props: BadgePropControlsProps): JSX.Element;
}

export const BadgePropControls: BadgePropControlsInterface = ({
  variation,
  setVariation,
  size,
  setSize,
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
          setVariation(event.target.value as BadgeProps['variation'])
        }
      >
        <option value="">default</option>
        <option value="info">info</option>
        <option value="error">error</option>
        <option value="warning">warning</option>
        <option value="success">success</option>
      </SelectField>

      <SelectField
        name="size"
        id="size"
        label="Size"
        value={size}
        onChange={(event) => setSize(event.target.value as BadgeProps['size'])}
      >
        <option value="">default</option>
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>

      <TextField
        label="Text"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
    </Flex>
  );
};
