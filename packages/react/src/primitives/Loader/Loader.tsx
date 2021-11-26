import * as React from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { LoaderProps } from '../types/loader';
import { PrimitiveWithForwardRef } from '../types/view';
import { ComponentClassNames } from '../shared/constants';

export const LINEAR_EMPTY = 'linear-empty';
export const LINEAR_FILLED = 'linear-filled';
export const CIRCULAR_EMPTY = 'circular-empty';
export const CIRCULAR_FILLED = 'circular-filled';

const LoaderPrimitive: PrimitiveWithForwardRef<LoaderProps, 'svg'> = (
  { className, filledColor, emptyColor, size, variation, ...rest },
  ref
) => {
  const linearLoader = (
    <g>
      <line
        x1="0"
        x2="100%"
        y1="50%"
        y2="50%"
        style={{ stroke: emptyColor }}
        data-testid={LINEAR_EMPTY}
      />
      <line
        x1="0"
        x2="100%"
        y1="50%"
        y2="50%"
        style={{ stroke: filledColor }}
        data-testid={LINEAR_FILLED}
      />
    </g>
  );

  // r + stroke-width should add up to 50% to avoid overflow
  const circularLoader = (
    <g>
      <circle
        cx="50%"
        cy="50%"
        r="42%"
        strokeWidth="8%"
        style={{ stroke: emptyColor }}
        data-testid={CIRCULAR_EMPTY}
      />
      <circle
        cx="50%"
        cy="50%"
        r="42%"
        strokeWidth="8%"
        style={{ stroke: filledColor }}
        data-testid={CIRCULAR_FILLED}
      />
    </g>
  );

  return (
    <View
      as="svg"
      className={classNames(ComponentClassNames.Loader, className)}
      data-size={size}
      data-variation={variation}
      ref={ref}
      role="img"
      {...rest}
    >
      {variation === 'linear' ? linearLoader : circularLoader}
    </View>
  );
};

export const Loader = React.forwardRef(LoaderPrimitive);

Loader.displayName = 'Loader';
