import classNames from 'classnames';
import * as React from 'react';

import { Flex } from '../Flex';
import { ButtonProps } from '../types/button';
import { ButtonGroupProps } from '../types/buttonGroup';
import { ComponentClassNames } from '../shared/constants';

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  alignContent,
  alignItems,
  ariaLabel,
  className,
  children,
  direction,
  gap,
  justifyContent,
  size,
  variation,
  wrap,
  ...rest
}) => (
  <Flex
    alignContent={alignContent}
    alignItems={alignItems}
    aria-label={ariaLabel}
    className={classNames(ComponentClassNames.ButtonGroup, className)}
    direction={direction}
    gap={gap}
    justifyContent={justifyContent}
    role="group"
    wrap={wrap}
    {...rest}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement<ButtonProps>(child)) {
        return React.cloneElement(child, { size, variation });
      }
      return child;
    })}
  </Flex>
);
