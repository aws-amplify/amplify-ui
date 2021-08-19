import React from 'react';

import { Flex, Select, SelectProps } from '@aws-amplify/ui-react';

import { FieldLabeler } from './FieldLabeler';

export interface SelectPropContorlsProps extends SelectProps {
  setSize: (value: React.SetStateAction<SelectProps['size']>) => void;
  setVariation: (value: React.SetStateAction<SelectProps['variation']>) => void;
  setIsDisabled: (
    value: React.SetStateAction<SelectProps['isDisabled']>
  ) => void;
}

interface SelectPropControlsInterface {
  (props: SelectPropContorlsProps): JSX.Element;
}

export const SelectPropControls: SelectPropControlsInterface = ({
  setSize,
  setVariation,
  setIsDisabled,
}) => {
  return (
    <fieldset className="p-4 border-2 border-current border-solid">
      <legend className="font-bold p-1">Select props:</legend>
      <Flex justifyContent="space-between">
        <FieldLabeler id="size">
          <Select
            name="size"
            id="size"
            defaultValue=""
            onChange={(event) =>
              setSize(event.target.value as SelectProps['size'])
            }
          >
            <option value="">default</option>
            <option value="small">small</option>
            <option value="large">large</option>
          </Select>
        </FieldLabeler>
        <FieldLabeler id="variation">
          <Select
            name="variation"
            id="variation"
            defaultValue=""
            onChange={(event) =>
              setVariation(event.target.value as SelectProps['variation'])
            }
          >
            <option value="">default</option>
            <option value="filled">filled</option>
            <option value="flushed">flushed</option>
          </Select>
        </FieldLabeler>
        <FieldLabeler id="isDisabled">
          <Flex justifyContent="center" className="mt-3">
            <input
              type="checkbox"
              name="isDisabled"
              id="isDisabled"
              onChange={(event) => {
                setIsDisabled(
                  Boolean(event.target.checked) as SelectProps['isDisabled']
                );
              }}
            />
          </Flex>
        </FieldLabeler>
      </Flex>
    </fieldset>
  );
};
