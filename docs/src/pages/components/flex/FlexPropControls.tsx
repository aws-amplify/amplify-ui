import { FlexProps, TextField, SelectField, Flex } from '@aws-amplify/ui-react';
import React from 'react';

export interface FlexPropControlsProps extends FlexProps {
  setDirection: (value: React.SetStateAction<FlexProps['direction']>) => void;
  setJustifyContent: (
    value: React.SetStateAction<FlexProps['justifyContent']>
  ) => void;
  setAlignItems: (value: React.SetStateAction<FlexProps['alignItems']>) => void;
  setAlignContent: (
    value: React.SetStateAction<FlexProps['alignContent']>
  ) => void;
  setWrap: (value: React.SetStateAction<FlexProps['wrap']>) => void;
  setGap: (value: React.SetStateAction<FlexProps['gap']>) => void;
}

interface FlexPropControlsInterface {
  (props: FlexPropControlsProps): JSX.Element;
}

export const FlexPropControls: FlexPropControlsInterface = ({
  direction,
  setDirection,
  justifyContent,
  setJustifyContent,
  alignItems,
  setAlignItems,
  alignContent,
  setAlignContent,
  wrap,
  setWrap,
  gap,
  setGap,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        name="direction"
        id="direction"
        label="Direction"
        value={direction as string}
        onChange={(event) =>
          setDirection(event.target.value as FlexProps['direction'])
        }
      >
        <option value="row">row</option>
        <option value="column">column</option>
        <option value="column-reverse">column-reverse</option>
        <option value="row-reverse">row-reverse</option>
      </SelectField>

      <SelectField
        name="justifyContent"
        id="justifyContent"
        label="Justify Content"
        value={justifyContent as string}
        onChange={(event) =>
          setJustifyContent(event.target.value as FlexProps['justifyContent'])
        }
      >
        <option value="flex-start">flex-start</option>
        <option value="flex-end">flex-end</option>
        <option value="center">center</option>
        <option value="space-between">space-between</option>
        <option value="space-around">space-around</option>
        <option value="space-evenly">space-evenly</option>
      </SelectField>

      <SelectField
        name="alignItems"
        id="alignItems"
        label="Align Items"
        value={alignItems as string}
        onChange={(event) =>
          setAlignItems(event.target.value as FlexProps['alignItems'])
        }
      >
        <option value="flex-start">flex-start</option>
        <option value="flex-end">flex-end</option>
        <option value="center">center</option>
        <option value="baseline">baseline</option>
        <option value="stretch">stretch</option>
      </SelectField>

      <SelectField
        name="alignContent"
        id="alignContent"
        label="Align Content"
        value={alignContent as string}
        onChange={(event) =>
          setAlignContent(event.target.value as FlexProps['alignContent'])
        }
      >
        <option value="flex-start">flex-start</option>
        <option value="flex-end">flex-end</option>
        <option value="center">center</option>
        <option value="space-between">space-between</option>
        <option value="space-around">space-around</option>
        <option value="stretch">stretch</option>
      </SelectField>

      <SelectField
        name="wrap"
        id="wrap"
        label="Wrap"
        value={wrap as string}
        onChange={(event) => setWrap(event.target.value as FlexProps['wrap'])}
      >
        <option value="nowrap">nowrap</option>
        <option value="wrap">wrap</option>
        <option value="wrap-reverse">wrap-reverse</option>
      </SelectField>

      <TextField
        label="Gap"
        value={gap as string}
        onChange={(event) => setGap(event.target.value as FlexProps['gap'])}
      />
    </Flex>
  );
};
