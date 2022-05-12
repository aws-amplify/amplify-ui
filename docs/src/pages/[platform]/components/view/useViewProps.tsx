import * as React from 'react';
import { View, ViewProps } from '@aws-amplify/ui-react';

import { ViewPropControlsProps } from './ViewPropControls';
import { demoState } from '@/utils/demoState';

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
  const [maxWidth, setMaxWidth] = React.useState<ViewProps['maxWidth']>(
    initialValues.maxWidth
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

  React.useEffect(() => {
    demoState.set(View.displayName, {
      ariaLabel,
      width,
      maxWidth,
      height,
      color,
      backgroundColor,
      boxShadow,
      padding,
      border,
      borderRadius,
      as,
    });
  }, [
    ariaLabel,
    width,
    maxWidth,
    height,
    color,
    backgroundColor,
    boxShadow,
    padding,
    border,
    borderRadius,
    as,
  ]);

  return React.useMemo(
    () => ({
      ariaLabel,
      setAriaLabel,
      width,
      setWidth,
      maxWidth,
      setMaxWidth,
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
    }),
    [
      ariaLabel,
      setAriaLabel,
      width,
      setWidth,
      maxWidth,
      setMaxWidth,
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
    ]
  );
};
