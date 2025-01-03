import * as React from 'react';
import {
  Flex,
  HeadingLevel,
  HeadingProps,
  SelectField,
  SwitchField,
  TextField,
} from '@aws-amplify/ui-react';

interface HeadingPropControlsProps extends HeadingProps {
  setLevel: (value: React.SetStateAction<HeadingProps['level']>) => void;
  setIsTruncated: (value: React.SetStateAction<boolean>) => void;
  value: string;
  setValue: (value: React.SetStateAction<string>) => void;
}

interface HeadingPropControlsInterface {
  (props: HeadingPropControlsProps): JSX.Element;
}

export const HeadingPropControls: HeadingPropControlsInterface = ({
  level,
  setLevel,
  isTruncated,
  setIsTruncated,
  value,
  setValue,
}) => {
  return (
    <Flex direction="column">
      <TextField
        label="Displayed Text"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      ></TextField>
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
      <SwitchField
        label="isTruncated"
        isChecked={isTruncated}
        labelPosition="end"
        onChange={(event) => setIsTruncated(event.target.checked)}
      />
    </Flex>
  );
};
