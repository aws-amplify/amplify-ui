import * as React from 'react';
import {
  Flex,
  HeadingLevel,
  HeadingProps,
  SelectField,
} from '@aws-amplify/ui-react';

interface HeadingPropControlsProps extends HeadingProps {
  setLevel: (value: React.SetStateAction<HeadingProps['level']>) => void;
}

interface HeadingPropControlsInterface {
  (props: HeadingPropControlsProps): JSX.Element;
}

export const HeadingPropControls: HeadingPropControlsInterface = ({
  level,
  setLevel,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        name="level"
        value={String(level)}
        onChange={(event) => setLevel(+event.target.value as HeadingLevel)}
        label="level"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </SelectField>
    </Flex>
  );
};
