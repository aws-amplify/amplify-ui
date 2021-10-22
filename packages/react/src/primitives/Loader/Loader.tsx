import classNames from 'classnames';
import * as React from 'react';

import { View } from '../View';
import { LoaderProps } from '../types/loader';
import { ComponentClassNames } from '../shared/constants';

export const Loader: React.FC<LoaderProps> = ({
  ariaLabel,
  className,
  filledColor,
  emptyColor,
  size,
  variation,
  ...rest
}) => {
  return (
    <View
      ariaLabel={ariaLabel}
      as="svg"
      className={classNames(ComponentClassNames.Loader, className)}
      data-size={size}
      data-variation={variation}
      role="img"
      {...rest}
    >
      {variation === 'linear' ? (
        <g>
          {/* stroke-linecap: round will cause overflow on the ends of an svg element, so 1% and 99% is a good choice versus 0% and 100% */}
          <line
            x1="1%"
            x2="99%"
            y1="50%"
            y2="50%"
            style={{ stroke: emptyColor }}
          />
          <line
            x1="1%"
            x2="99%"
            y1="50%"
            y2="50%"
            style={{ stroke: filledColor }}
          />
        </g>
      ) : (
        <g>
          <circle cx="50%" cy="50%" r="42%" style={{ stroke: emptyColor }} />
          <circle cx="50%" cy="50%" r="42%" style={{ stroke: filledColor }} />
        </g>
      )}
    </View>
  );
};
