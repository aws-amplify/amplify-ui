import * as React from 'react';
import {
  AvatarProps,
  SelectField,
  TextField,
  Flex,
} from '@aws-amplify/ui-react';

export interface AvatarPropControlsProps extends AvatarProps {
  setVariation: (value: React.SetStateAction<AvatarProps['variation']>) => void;
  setSize: (value: React.SetStateAction<AvatarProps['size']>) => void;
  setSrc: (value: React.SetStateAction<string>) => void;
  setColorTheme: (
    value: React.SetStateAction<AvatarProps['colorTheme']>
  ) => void;
}

interface AvatarPropControlsInterface {
  (props: AvatarPropControlsProps): JSX.Element;
}

export const AvatarPropControls: AvatarPropControlsInterface = ({
  variation,
  setVariation,
  size,
  setSize,
  colorTheme,
  setColorTheme,
  src,
  setSrc,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        name="variation"
        id="variation"
        label="Variation"
        value={variation}
        onChange={(event) =>
          setVariation(event.target.value as AvatarProps['variation'])
        }
      >
        <option value="">default</option>
        <option value="filled">filled</option>
        <option value="outlined">outlined</option>
      </SelectField>

      <SelectField
        name="colorTheme"
        id="colorTheme"
        label="Color theme"
        value={colorTheme}
        onChange={(event) =>
          setColorTheme(event.target.value as AvatarProps['colorTheme'])
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
        onChange={(event) => setSize(event.target.value as AvatarProps['size'])}
      >
        <option value="">default</option>
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>

      <TextField
        label="src"
        value={src}
        placeholder="/cats/1.jpg"
        onChange={(event) => setSrc(event.target.value)}
      />
    </Flex>
  );
};
