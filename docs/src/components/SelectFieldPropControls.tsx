import React from 'react';

import {
  Flex,
  SelectField,
  SelectFieldProps,
  TextField,
} from '@aws-amplify/ui-react';

import { FieldLabeler } from './FieldLabeler';

export interface SelectFieldPropControlsProps extends SelectFieldProps {
  setErrorMessage: (
    value: React.SetStateAction<SelectFieldProps['errorMessage']>
  ) => void;
  setHasError: (
    value: React.SetStateAction<SelectFieldProps['hasError']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<SelectFieldProps['isDisabled']>
  ) => void;
  setLabel: (value: React.SetStateAction<SelectFieldProps['label']>) => void;
  setLabelHidden: (
    value: React.SetStateAction<SelectFieldProps['labelHidden']>
  ) => void;
  setSize: (value: React.SetStateAction<SelectFieldProps['size']>) => void;
  setVariation: (
    value: React.SetStateAction<SelectFieldProps['variation']>
  ) => void;
}

interface SelectFieldPropControlsInterface {
  (props: SelectFieldPropControlsProps): JSX.Element;
}

export const SelectFieldPropControls: SelectFieldPropControlsInterface = ({
  setErrorMessage,
  setHasError,
  setIsDisabled,
  setLabel,
  setLabelHidden,
  setSize,
  setVariation,
}) => {
  return (
    <fieldset className="p-4 border-2 border-current border-solid">
      <legend className="font-bold p-1">Select props:</legend>
      <Flex justifyContent="space-evenly" wrap="wrap">
        <SelectField
          label="size"
          name="size"
          id="size"
          placeholder="default"
          onChange={(event) =>
            setSize(event.target.value as SelectFieldProps['size'])
          }
        >
          <option value="small">small</option>
          <option value="large">large</option>
        </SelectField>
        <SelectField
          label="variation"
          name="variation"
          id="variation"
          placeholder="default"
          onChange={(event) =>
            setVariation(event.target.value as SelectFieldProps['variation'])
          }
        >
          <option value="quiet">quiet</option>
        </SelectField>
      </Flex>
      <Flex justifyContent="space-evenly" wrap="wrap" className="mt-5">
        <TextField
          label="label"
          name="label"
          id="label"
          placeholder="Specify a label"
          onChange={(event) =>
            setLabel(event.target.value as SelectFieldProps['label'])
          }
        />
        <TextField
          label="errorMessage"
          name="errorMessage"
          id="errorMessage"
          placeholder="Specify error message"
          onChange={(event) =>
            setErrorMessage(
              event.target.value as SelectFieldProps['errorMessage']
            )
          }
        />
      </Flex>
      <Flex justifyContent="space-evenly" wrap="wrap" className="mt-5">
        <FieldLabeler id="labelHidden">
          <Flex justifyContent="center">
            <input
              type="checkbox"
              name="labelHidden"
              id="labelHidden"
              onChange={(event) => {
                setLabelHidden(
                  Boolean(
                    event.target.checked
                  ) as SelectFieldProps['labelHidden']
                );
              }}
            />
          </Flex>
        </FieldLabeler>
        <FieldLabeler id="hasError">
          <Flex justifyContent="center">
            <input
              type="checkbox"
              name="hasError"
              id="labelHidden"
              onChange={(event) => {
                setHasError(
                  Boolean(event.target.checked) as SelectFieldProps['hasError']
                );
              }}
            />
          </Flex>
        </FieldLabeler>
        <FieldLabeler id="isDisabled">
          <Flex justifyContent="center">
            <input
              type="checkbox"
              name="isDisabled"
              id="isDisabled"
              onChange={(event) => {
                setIsDisabled(
                  Boolean(
                    event.target.checked
                  ) as SelectFieldProps['isDisabled']
                );
              }}
            />
          </Flex>
        </FieldLabeler>
      </Flex>
    </fieldset>
  );
};
