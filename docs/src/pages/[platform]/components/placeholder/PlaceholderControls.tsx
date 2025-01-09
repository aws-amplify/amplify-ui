import * as React from 'react';
import {
  Flex,
  PlaceholderProps,
  SelectField,
  SwitchField,
  TextField,
} from '@aws-amplify/ui-react';

export interface PlaceholderPropControlsProps extends PlaceholderProps {
  setStartColor: (
    value: React.SetStateAction<PlaceholderProps['startColor']>
  ) => void;
  setEndColor: (
    value: React.SetStateAction<PlaceholderProps['endColor']>
  ) => void;
  setSize: (value: React.SetStateAction<PlaceholderProps['size']>) => void;
  setIsLoaded: (
    value: React.SetStateAction<PlaceholderProps['isLoaded']>
  ) => void;
}

interface PlaceholderPropControlsInterface {
  (props: PlaceholderPropControlsProps): React.ReactElement;
}

export const PlaceholderControls: PlaceholderPropControlsInterface = ({
  startColor,
  setStartColor,
  endColor,
  setEndColor,
  size,
  setSize,
  isLoaded,
  setIsLoaded,
}) => {
  return (
    <Flex direction="column">
      <TextField
        placeholder="Set start color"
        name="startColor"
        value={startColor as string}
        onChange={(event: any) => {
          setStartColor(event.target.value);
        }}
        label="startColor"
      />
      <TextField
        placeholder="Set end color"
        name="endColor"
        value={endColor as string}
        onChange={(event: any) => {
          setEndColor(event.target.value);
        }}
        label="endColor"
      />
      <SelectField
        value={size}
        onChange={(e) =>
          setSize(
            e.target.value as React.SetStateAction<PlaceholderProps['size']>
          )
        }
        label="size"
      >
        <option value="">default</option>
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
      <SwitchField
        checked={isLoaded}
        onChange={(e) => setIsLoaded(e.target.checked)}
        label="isLoaded"
      />
    </Flex>
  );
};
