import {
  CollectionProps,
  FlexProps,
  Flex,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';

export type CollectionPropControlsProps = CollectionProps<[]> & {
  setAlignContent: (
    value: React.SetStateAction<CollectionProps<[]>['alignContent']>
  ) => void;
  setAlignItems: () => void;
  setDirection: () => void;
  setGap: () => void;
  setJustifyContent: () => void;
  setWrap: () => void;
};

interface CollectionPropControlsInterface {
  (props: CollectionPropControlsProps): JSX.Element;
}

export const CollectionPropControls = ({
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
        value={direction}
        onChange={(event) =>
          setDirection(event.target.value as FlexProps['direction'])
        }
      >
        <option value="row">row</option>
        <option value="column">column</option>
      </SelectField>

      <TextField
        label="Gap"
        value={gap as string}
        onChange={(event) =>
          setGap(event.target.value as CollectionProps<[]>['gap'])
        }
      />

      <SelectField
        name="wrap"
        id="wrap"
        label="Wrap"
        value={wrap}
        onChange={(event) => setWrap(event.target.value as FlexProps['wrap'])}
      >
        <option value="nowrap">nowrap</option>
        <option value="wrap">wrap</option>
        <option value="wrap-reverse">wrap-reverse</option>
      </SelectField>
    </Flex>
  );
};
