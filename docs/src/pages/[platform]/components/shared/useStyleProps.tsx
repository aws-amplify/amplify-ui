import * as React from 'react';
import { BaseStyleProps } from '@aws-amplify/ui-react';

import { StylePropControlsProps } from './StylePropControls';

interface UseStyleProps {
  (initialValues: BaseStyleProps): StylePropControlsProps;
}

export const useStyleProps: UseStyleProps = (initialValues) => {
  const [width, setWidth] = React.useState<BaseStyleProps['width']>(
    initialValues.width
  );
  const [height, setHeight] = React.useState<BaseStyleProps['height']>(
    initialValues.height
  );
  const [maxHeight, setMaxHeight] = React.useState<BaseStyleProps['maxHeight']>(
    initialValues.maxHeight
  );
  const [minHeight, setMinHeight] = React.useState<BaseStyleProps['minHeight']>(
    initialValues.minHeight
  );
  const [maxWidth, setMaxWidth] = React.useState<BaseStyleProps['maxWidth']>(
    initialValues.maxWidth
  );
  const [minWidth, setMinWidth] = React.useState<BaseStyleProps['minWidth']>(
    initialValues.minWidth
  );
  const [color, setColor] = React.useState<BaseStyleProps['color']>(
    initialValues.color
  );
  const [backgroundColor, setBackgroundColor] = React.useState<
    BaseStyleProps['backgroundColor']
  >(initialValues.backgroundColor);
  const [boxShadow, setBoxShadow] = React.useState<BaseStyleProps['boxShadow']>(
    initialValues.boxShadow
  );
  const [padding, setPadding] = React.useState<BaseStyleProps['padding']>(
    initialValues.padding
  );
  const [border, setBorder] = React.useState<BaseStyleProps['border']>(
    initialValues.border
  );
  const [borderRadius, setBorderRadius] = React.useState<
    BaseStyleProps['borderRadius']
  >(initialValues.borderRadius);
  const [opacity, setOpacity] = React.useState<BaseStyleProps['opacity']>(
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
