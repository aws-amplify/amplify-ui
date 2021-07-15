import { useState, useEffect } from "react";
import { StyleProps } from "@aws-amplify/ui-react";
import { StylePropControlsProps } from "./StylePropControls";

interface UseStyleProps {
  (initialValues: StyleProps): StylePropControlsProps;
}

export const useStyleProps: UseStyleProps = (initialValues) => {
  const [width, setWidth] = useState<StyleProps["width"]>(initialValues.width);
  const [height, setHeight] = useState<StyleProps["height"]>(
    initialValues.height
  );
  const [maxHeight, setMaxHeight] = useState<StyleProps["maxHeight"]>(
    initialValues.maxHeight
  );
  const [minHeight, setMinHeight] = useState<StyleProps["minHeight"]>(
    initialValues.minHeight
  );
  const [maxWidth, setMaxWidth] = useState<StyleProps["maxWidth"]>(
    initialValues.maxWidth
  );
  const [minWidth, setMinWidth] = useState<StyleProps["minWidth"]>(
    initialValues.minWidth
  );
  const [color, setColor] = useState<StyleProps["color"]>(initialValues.color);
  const [backgroundColor, setBackgroundColor] = useState<
    StyleProps["backgroundColor"]
  >(initialValues.backgroundColor);
  const [boxShadow, setBoxShadow] = useState<StyleProps["boxShadow"]>(
    initialValues.boxShadow
  );
  const [padding, setPadding] = useState<StyleProps["padding"]>(
    initialValues.padding
  );
  const [border, setBorder] = useState<StyleProps["border"]>(
    initialValues.border
  );
  const [borderRadius, setBorderRadius] = useState<StyleProps["borderRadius"]>(
    initialValues.borderRadius
  );
  const [opacity, setOpacity] = useState<StyleProps["opacity"]>(
    initialValues.opacity
  );

  return {
    backgroundColor,
    border,
    borderRadius,
    boxShadow,
    color,
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    opacity,
    padding,
    width,
    setBackgroundColor,
    setBorder,
    setBorderRadius,
    setBoxShadow,
    setColor,
    setHeight,
    setMaxHeight,
    setMaxWidth,
    setMinHeight,
    setMinWidth,
    setOpacity,
    setPadding,
    setWidth,
  };
};
