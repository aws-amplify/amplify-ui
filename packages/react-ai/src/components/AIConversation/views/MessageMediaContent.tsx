import React from 'react';
import { ImageElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';

export const MessageMediaContent = <T extends ImageElementProps>({
  ariaLabel,
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const Image = useElement('Image');
  return (
    <Image aria-label={ariaLabel} className={className} {...rest}>
      {children}
    </Image>
  );
};
