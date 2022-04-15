import * as React from 'react';
import {
  Flex,
  PlaceholderProps,
  SelectField,
  SwitchField,
} from '@aws-amplify/ui-react';

export interface PlaceholderPropControlsProps extends PlaceholderProps {
  setSize: (value: React.SetStateAction<PlaceholderProps['size']>) => void;
  setIsLoaded: (
    value: React.SetStateAction<PlaceholderProps['isLoaded']>
  ) => void;
}

interface PlaceholderPropControlsInterface {
  (props: PlaceholderPropControlsProps): React.ReactElement;
}

export const PlaceholderControls: PlaceholderPropControlsInterface = ({
  size,
  setSize,
  isLoaded,
  setIsLoaded,
}) => {
  return (
    <Flex direction="column">
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
