import * as React from 'react';
import { Avatar, AvatarProps } from '@aws-amplify/ui-react';
import { demoState } from '@/utils/demoState';
import { AvatarPropControlsProps } from './AvatarPropControls';

interface UseAvatarProps {
  (initialValues: AvatarProps): AvatarPropControlsProps;
}

export const useAvatarProps: UseAvatarProps = (initialValues) => {
  const [variation, setVariation] = React.useState<AvatarProps['variation']>(
    initialValues.variation
  );
  const [colorTheme, setColorTheme] = React.useState<AvatarProps['colorTheme']>(
    initialValues.colorTheme
  );
  const [size, setSize] = React.useState<AvatarProps['size']>(
    initialValues.size
  );
  const [src, setSrc] = React.useState<string>(initialValues.src);

  React.useEffect(() => {
    demoState.set(Avatar.displayName, {
      variation,
      size,
      colorTheme,
      src,
    });
  }, [variation, size, colorTheme, src]);

  return React.useMemo(
    () => ({
      variation,
      setVariation,
      size,
      setSize,
      colorTheme,
      setColorTheme,
      src,
      setSrc,
    }),
    [
      variation,
      setVariation,
      size,
      setSize,
      colorTheme,
      setColorTheme,
      src,
      setSrc,
    ]
  );
};
