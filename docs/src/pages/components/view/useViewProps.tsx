import * as React from 'react';
import { ViewProps } from '@aws-amplify/ui-react';

import { ViewPropControlsProps } from './ViewPropControls';

interface UseViewProps {
  (initialValues: ViewProps): ViewPropControlsProps;
}

export const useViewProps: UseViewProps = (initialValues) => {
  const [ariaLabel, setAriaLabel] = React.useState<ViewProps['ariaLabel']>(
    initialValues.ariaLabel
  );
  const [width, setWidth] = React.useState<ViewProps['width']>(
    initialValues.width
  );
  const [height, setHeight] = React.useState<ViewProps['height']>(
    initialValues.height
  );
  const [color, setColor] = React.useState<ViewProps['color']>(
    initialValues.color
  );
  const [backgroundColor, setBackgroundColor] = React.useState<
    ViewProps['backgroundColor']
  >(initialValues.backgroundColor);
  const [boxShadow, setBoxShadow] = React.useState<ViewProps['boxShadow']>(
    initialValues.boxShadow
  );
  const [padding, setPadding] = React.useState<ViewProps['padding']>(
    initialValues.padding
  );
  const [border, setBorder] = React.useState<ViewProps['border']>(
    initialValues.border
  );
  const [borderRadius, setBorderRadius] = React.useState<
    ViewProps['borderRadius']
  >(initialValues.borderRadius);

  const [as, setAsElementType] = React.useState<ViewProps['as']>(
    initialValues.as
  );

  return {
    ariaLabel,
    setAriaLabel,
    width,
    setWidth,
    height,
    setHeight,
    color,
    setColor,
    backgroundColor,
    setBackgroundColor,
    boxShadow,
    setBoxShadow,
    padding,
    setPadding,
    border,
    setBorder,
    borderRadius,
    setBorderRadius,
    as,
    setAsElementType,
  };
};
