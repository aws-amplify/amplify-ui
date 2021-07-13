import {
  DividerOptions,
  ImageOptions,
  ImageProps,
} from "@aws-amplify/ui-react";
import { useState } from "react";
import { DividerPropControlsProps } from "./DividerPropControls";

interface UseDividerProps {
  (initialValues: DividerOptions): DividerPropControlsProps;
}

export const useDividerProps: UseDividerProps = initialValues => {
  const [size, setSize] = useState<DividerOptions["size"]>(initialValues.size);
  const [orientation, setOrientation] = useState<DividerOptions["orientation"]>(
    initialValues.orientation
  );

  return {
    size,
    setSize,
    orientation,
    setOrientation,
  };
};
