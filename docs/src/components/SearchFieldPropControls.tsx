import React from 'react';
import {
  SearchFieldProps,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface SearchFieldPropControlsProps extends SearchFieldProps {
  setIsDisabled: React.Dispatch<
    React.SetStateAction<SearchFieldProps['isDisabled']>
  >;
  setLabelHidden: React.Dispatch<
    React.SetStateAction<SearchFieldProps['labelHidden']>
  >;
  setLabel: React.Dispatch<React.SetStateAction<SearchFieldProps['label']>>;
  setSize: React.Dispatch<React.SetStateAction<SearchFieldProps['size']>>;
  setVariation: React.Dispatch<
    React.SetStateAction<SearchFieldProps['variation']>
  >;
  setPlaceholder: React.Dispatch<
    React.SetStateAction<SearchFieldProps['placeholder']>
  >;
}

interface SearchFieldPropControlsInterface {
  (props: SearchFieldPropControlsProps): JSX.Element;
}

export const SearchFieldPropControls: SearchFieldPropControlsInterface = ({
  isDisabled,
  setIsDisabled,
  label,
  setLabel,
  labelHidden,
  setLabelHidden,
  placeholder,
  setPlaceholder,
  size,
  setSize,
  variation,
  setVariation,
}) => {
  return (
    <DemoBox primitiveName="SearchField">
      <TextField
        label="label"
        name="label"
        value={label as string}
        onChange={(event) => {
          setLabel(event.target.value as SearchFieldProps['label']);
        }}
      />
      <TextField
        label="placeholder"
        value={placeholder}
        onChange={(event) => {
          setPlaceholder(event.target.value as SearchFieldProps['placeholder']);
        }}
      />
      <SelectField
        label="size"
        name="size"
        defaultValue={size}
        onChange={(event) =>
          setSize(event.target.value as SearchFieldProps['size'])
        }
      >
        <option value="">default</option>
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>

      <SelectField
        label="variation"
        name="variation"
        onChange={(event) =>
          setVariation(
            event.target.value as unknown as SearchFieldProps['variation']
          )
        }
      >
        <option value="">default</option>
        <option value="quiet">quiet</option>
      </SelectField>
      <FieldLabeler id="isDisabled">
        <input
          type="checkbox"
          name="isDisabled"
          defaultChecked={isDisabled}
          onChange={(event) => {
            setIsDisabled(
              Boolean(event.target.checked) as SearchFieldProps['isDisabled']
            );
          }}
        />
      </FieldLabeler>
      <FieldLabeler id="labelHidden">
        <input
          type="checkbox"
          name="labelHidden"
          defaultChecked={labelHidden as boolean}
          onChange={(event) => {
            setLabelHidden(
              Boolean(event.target.checked) as SearchFieldProps['labelHidden']
            );
          }}
        />
      </FieldLabeler>
    </DemoBox>
  );
};
