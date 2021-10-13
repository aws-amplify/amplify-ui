import { useState, useEffect } from 'react';
import { BaseStyleProps } from '@aws-amplify/ui-react';
import { StylePropControlsProps } from './StylePropControls';

interface UseStyleProps {
  (initialValues: BaseStyleProps): StylePropControlsProps;
}

export const useStyleProps: UseStyleProps = (initialValues) => {
  const [width, setWidth] = useState<BaseStyleProps['width']>(
    initialValues.width
  );
  const [height, setHeight] = useState<BaseStyleProps['height']>(
    initialValues.height
  );
  const [maxHeight, setMaxHeight] = useState<BaseStyleProps['maxHeight']>(
    initialValues.maxHeight
  );
  const [minHeight, setMinHeight] = useState<BaseStyleProps['minHeight']>(
    initialValues.minHeight
  );
  const [maxWidth, setMaxWidth] = useState<BaseStyleProps['maxWidth']>(
    initialValues.maxWidth
  );
  const [minWidth, setMinWidth] = useState<BaseStyleProps['minWidth']>(
    initialValues.minWidth
  );
  const [color, setColor] = useState<BaseStyleProps['color']>(
    initialValues.color
  );
  const [backgroundColor, setBackgroundColor] = useState<
    BaseStyleProps['backgroundColor']
  >(initialValues.backgroundColor);
  const [boxShadow, setBoxShadow] = useState<BaseStyleProps['boxShadow']>(
    initialValues.boxShadow
  );
  const [padding, setPadding] = useState<BaseStyleProps['padding']>(
    initialValues.padding
  );
  const [border, setBorder] = useState<BaseStyleProps['border']>(
    initialValues.border
  );
  const [borderRadius, setBorderRadius] = useState<
    BaseStyleProps['borderRadius']
  >(initialValues.borderRadius);
  const [opacity, setOpacity] = useState<BaseStyleProps['opacity']>(
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
