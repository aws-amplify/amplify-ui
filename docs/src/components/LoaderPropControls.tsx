import * as React from 'react';

import { LoaderProps, SelectField, TextField } from '@aws-amplify/ui-react';

import { DemoBox } from './DemoBox';

export interface LoaderPropControlsProps extends LoaderProps {
  setSize: (value: React.SetStateAction<LoaderProps['size']>) => void;
  setVariation: (value: React.SetStateAction<LoaderProps['variation']>) => void;
  setEmptyColor: (
    value: React.SetStateAction<LoaderProps['emptyColor']>
  ) => void;
  setFilledColor: (
    value: React.SetStateAction<LoaderProps['filledColor']>
  ) => void;
}

export const LoaderPropControls: React.FC<LoaderPropControlsProps> = ({
  size,
  setSize,
  variation,
  setVariation,
  emptyColor,
  setEmptyColor,
  filledcolor,
  setFilledColor,
}) => {
  return (
    <DemoBox primitiveName="Loader">
      <SelectField
        label="size"
        value={size}
        placeholder="default"
        onChange={(event) => setSize(event.target.value as LoaderProps['size'])}
      >
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
      <SelectField
        label="variation"
        value={variation}
        placeholder="default"
        onChange={(event) =>
          setVariation(event.target.value as LoaderProps['variation'])
        }
      >
        <option value="linear">linear</option>
      </SelectField>
      <TextField
        label="emptyColor"
        value={emptyColor}
        onChange={(event) => setEmptyColor(event.target.value)}
      />
      <TextField
        label="filledColor"
        value={filledcolor}
        onChange={(event) => setFilledColor(event.target.value)}
      />
    </DemoBox>
  );
};
