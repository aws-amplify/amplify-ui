import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { classNameModifier } from '../shared/utils';
import { OverlayProps, Primitive } from '../types';
import { Flex } from '../Flex';

const OverlayPrimitive: Primitive<OverlayProps, typeof Flex> = (
  {
    children,
    origin = { horizontal: 'start', vertical: 'start' },
    className,
    ...rest
  },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.Overlay,
    className,
    origin.horizontal &&
      classNameModifier(
        ComponentClassNames.Overlay,
        `horizontal-${origin.horizontal}`
      ),
    origin.vertical &&
      classNameModifier(
        ComponentClassNames.Overlay,
        `vertical-${origin.vertical}`
      )
  );

  return (
    <Flex className={componentClasses} ref={ref} {...rest}>
      {children}
    </Flex>
  );
};

export const Overlay = React.forwardRef(OverlayPrimitive);

Overlay.displayName = 'Overlay';
