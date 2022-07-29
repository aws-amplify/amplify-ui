import { Icon, IconProps } from '@aws-amplify/ui-react';
import * as React from 'react';
import { demoState } from '@/utils/demoState';

import { IconPropControlsProps } from './IconPropControls';

interface UseIconProps {
  (initialValues: IconProps): IconPropControlsProps;
}

export const useIconProps: UseIconProps = (initialValues) => {
  const [pathData, setPathData] = React.useState<IconProps['pathData']>(
    initialValues.pathData
  );

  const [viewBox, setViewBox] = React.useState<IconProps['viewBox']>(
    initialValues.viewBox
  );

  const [width, setWidth] = React.useState<IconProps['width']>(
    initialValues.width
  );

  const [height, setHeight] = React.useState<IconProps['height']>(
    initialValues.height
  );

  const [ariaLabel, setAriaLabel] = React.useState<IconProps['ariaLabel']>(
    initialValues.ariaLabel
  );

  const [color, setColor] = React.useState<IconProps['color']>(
    initialValues.color
  );

  React.useEffect(() => {
    demoState.set(Icon.displayName, {
      pathData,
      viewBox,
      ariaLabel,
      width,
      height,
      color,
    });
  }, [pathData, viewBox, ariaLabel, width, height, color]);

  return React.useMemo(
    () => ({
      pathData,
      setPathData,
      viewBox,
      setViewBox,
      ariaLabel,
      setAriaLabel,
      width,
      setWidth,
      height,
      setHeight,
      color,
      setColor,
    }),
    [
      pathData,
      setPathData,
      viewBox,
      setViewBox,
      ariaLabel,
      setAriaLabel,
      width,
      setWidth,
      height,
      setHeight,
      color,
      setColor,
    ]
  );
};
