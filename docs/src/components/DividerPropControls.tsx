import React from "react";
import { DividerOptions, ImageOptions } from "@aws-amplify/ui-react";
import { FieldLabeler } from "./FieldLabeler";

export interface DividerPropControlsProps extends DividerOptions {
  setSize: (value: React.SetStateAction<DividerOptions["size"]>) => void;
  setOrientation: (
    value: React.SetStateAction<DividerOptions["orientation"]>
  ) => void;
}

interface DividerPropControlsInterface {
  (props: DividerPropControlsProps): JSX.Element;
}

export const DividerPropControls: DividerPropControlsInterface = ({
  size,
  setSize,
  orientation,
  setOrientation,
}) => {
  return (
    <fieldset className="p-4 border-2 border-current border-solid">
      <legend className="font-bold p-1">Divider props:</legend>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 flex-wrap my-2">
        <FieldLabeler id="size">
          <select
            name="size"
            id="size"
            value={size}
            onChange={(event) =>
              setSize(event.target.value as DividerOptions["size"])
            }
          >
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </FieldLabeler>

        <FieldLabeler id="orientation">
          <select
            name="orientation"
            id="orientation"
            value={orientation}
            onChange={(event) =>
              setOrientation(
                event.target.value as DividerOptions["orientation"]
              )
            }
          >
            <option value="horizontal">horizontal</option>
            <option value="vertical">vertical</option>
          </select>
        </FieldLabeler>
      </div>
    </fieldset>
  );
};
