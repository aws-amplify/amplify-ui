import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { LoaderProps } from '../types/loader';
import { Primitive } from '../types/view';
import { View } from '../View';

export const LINEAR_EMPTY = 'linear-empty';
export const LINEAR_FILLED = 'linear-filled';
export const CIRCULAR_EMPTY = 'circular-empty';
export const CIRCULAR_FILLED = 'circular-filled';
// radius + strokeWidth = 50
export const CIRCULAR_STROKE_WIDTH = 8;
export const RADIUS = 42;
// circumference = 2 * r * PI  (r = 42)
export const CIRCUMFERENCE = 2 * RADIUS * Math.PI;

const LoaderPrimitive: Primitive<LoaderProps, 'svg'> = (
  {
    className,
    filledColor,
    emptyColor,
    size,
    variation,
    isDeterminate = false,
    isPercentageTextHidden = false,
    percentage = 0,
    ...rest
  },
  ref
) => {
  percentage = Math.min(percentage, 100);
  percentage = Math.max(percentage, 0);

  const percent = `${percentage}%`;

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
        x2={isDeterminate ? percent : '100%'}
        y1="50%"
        y2="50%"
        style={{
          // To get rid of the visible stroke linecap when percentage is 0
          stroke: isDeterminate && percentage === 0 ? 'none' : filledColor,
        }}
        data-testid={LINEAR_FILLED}
      />
      {isDeterminate ? (
        <text
          aria-live="polite"
          className={classNames(
            ComponentClassNames.LoaderPercentageText,
            isPercentageTextHidden ? ComponentClassNames.VisuallyHidden : null
          )}
          // -1% offset makes the text position look nicest
          x={`${-1 + percentage}%`}
          y="200%"
        >
          {percent}
        </text>
      ) : null}
    </g>
  );

  // r + stroke-width should add up to 50% to avoid overflow
  const circularLoader = (
    <g>
      <circle
        cx="50%"
        cy="50%"
        r={`${RADIUS}%`}
        strokeWidth={`${CIRCULAR_STROKE_WIDTH}%`}
        style={{ stroke: emptyColor }}
        data-testid={CIRCULAR_EMPTY}
      />
      <circle
        cx="50%"
        cy="50%"
        r={`${RADIUS}%`}
        strokeWidth={`${CIRCULAR_STROKE_WIDTH}%`}
        style={{
          stroke: filledColor,
          strokeDasharray: isDeterminate
            ? `${CIRCUMFERENCE}% ${CIRCUMFERENCE}%`
            : undefined,
          strokeDashoffset: isDeterminate
            ? `${CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / 100}%`
            : undefined,
        }}
        data-testid={CIRCULAR_FILLED}
      />
      {isDeterminate ? (
        <text
          aria-live="polite"
          className={classNames(
            ComponentClassNames.LoaderPercentageText,
            isPercentageTextHidden ? ComponentClassNames.VisuallyHidden : null
          )}
          // this x and y make text position look nicest
          x="130%"
          y="80%"
        >
          {percent}
        </text>
      ) : null}
    </g>
  );

  return (
    <View
      as="svg"
      className={classNames(
        ComponentClassNames.Loader,
        isDeterminate ? ComponentClassNames.LoaderDeterminate : null,
        className
      )}
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
