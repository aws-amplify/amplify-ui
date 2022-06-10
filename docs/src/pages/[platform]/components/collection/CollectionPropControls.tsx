import {
  CollectionProps,
  FlexProps,
  Flex,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';
import React from 'react';

export type CollectionPropControlsProps = Omit<
  CollectionProps<[]>,
  'type' | 'children' | 'items'
> &
  FlexProps & {
    setDirection: (value: React.SetStateAction<FlexProps['direction']>) => void;
    setGap: (value: React.SetStateAction<FlexProps['gap']>) => void;
    setWrap: (value: React.SetStateAction<FlexProps['wrap']>) => void;
  };

interface CollectionPropControlsInterface {
  (props: CollectionPropControlsProps): JSX.Element;
}

export const CollectionPropControls: CollectionPropControlsInterface = ({
  direction,
  setDirection,
  gap,
  setGap,
  wrap,
  setWrap,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        name="direction"
        id="direction"
        label="direction"
        value={direction as string}
        onChange={(event) => setDirection(event.target.value)}
      >
        <option value="row">row</option>
        <option value="column">column</option>
      </SelectField>

      <TextField
        label="Gap"
        value={gap as string}
        onChange={(event) => setGap(event.target.value)}
      />

      <SelectField
        name="wrap"
        id="wrap"
        label="Wrap"
        value={wrap as string}
        onChange={(event) => setWrap(event.target.value)}
      >
        <option value="nowrap">nowrap</option>
        <option value="wrap">wrap</option>
        <option value="wrap-reverse">wrap-reverse</option>
      </SelectField>
    </Flex>
  );
};
