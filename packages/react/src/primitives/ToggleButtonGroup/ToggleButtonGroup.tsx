import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import {
  Primitive,
  ForwardRefPrimitive,
  ToggleButtonProps,
  BaseToggleButtonGroupProps,
  ToggleButtonGroupProps,
} from '../types';
import { useToggleButtonGroup } from './useToggleButtonGroup';
import { isString } from '@aws-amplify/ui';

const ToggleButtonGroupPrimitive: Primitive<ToggleButtonGroupProps, 'div'> = (
  {
    children,
    className,
    isExclusive,
    isSelectionRequired,
    onChange,
    size,
    value,
    variation,
    ...rest
  },
  ref
) => {
  const handleChange = useToggleButtonGroup({
    onChange,
    value,
    isExclusive,
    isSelectionRequired,
  });

  return (
    <Flex
      className={classNames(ComponentClassNames.ToggleButtonGroup, className)}
      ref={ref}
      role="group"
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ToggleButtonProps>(child)) {
          return React.cloneElement(child, {
            isPressed: isExclusive
              ? value === child.props.value
              : isString(child.props.value) &&
                value.includes(child.props.value),
            onChange: handleChange,
            size,
            variation,
          });
        }
        return child;
      })}
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/togglebutton#togglebuttongroup)
 */
export const ToggleButtonGroup: ForwardRefPrimitive<
  BaseToggleButtonGroupProps,
  'div'
> = React.forwardRef(ToggleButtonGroupPrimitive);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
