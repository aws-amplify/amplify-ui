import React from 'react';
import { RatingProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';

export const RatingPropControls = ({
  value,
  maxValue,
  size,
  fillColor,
  emptyColor,
  setValue,
  setMaxValue,
  setSize,
  setFillColor,
  setEmptyColor,
}) => {
  return (
    <fieldset className="p-4 border-2 border-current border-solid">
      <legend className="font-bold p-1">Rating props:</legend>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 flex-wrap my-2">
        <FieldLabeler id="value">
          <input
            id="value"
            type="text"
            placeholder="Set Value"
            value={value}
            onChange={(event: any) => {
              setValue(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="maxValue">
          <input
            id="maxValue"
            type="text"
            placeholder="Set Max Value"
            value={maxValue}
            onChange={(event: any) => {
              setMaxValue(parseInt(event.target.value));
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="size">
          <select
            id="size"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </FieldLabeler>
        <FieldLabeler id="fillColor">
          <input
            id="fillColor"
            type="text"
            placeholder="Set Fill Color"
            value={fillColor}
            onChange={(event: any) => {
              setFillColor(event.target.value);
            }}
          />
        </FieldLabeler>
        <FieldLabeler id="emptyColor">
          <input
            id="emptyColor"
            type="text"
            placeholder="Set Empty Color"
            value={emptyColor}
            onChange={(event: any) => {
              setEmptyColor(event.target.value);
            }}
          />
        </FieldLabeler>
      </div>
    </fieldset>
  );
};
