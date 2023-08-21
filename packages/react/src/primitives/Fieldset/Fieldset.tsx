import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { classNameModifier, classNameModifierByFlag } from '../shared/utils';

import { Flex } from '../Flex';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';

import {
  FieldsetProps,
  BaseFieldsetProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { FieldsetContext } from './useFieldset';

const FieldsetPrimitive: Primitive<FieldsetProps, 'fieldset'> = (
  {
    children,
    className,
    isDisabled,
    isHorizontal,
    legend,
    legendHidden,
    size,
    testId,
    variation,
    ...rest
  },
  ref
) => {
  const value = React.useMemo(
    () => ({
      isDisabled,
    }),
    [isDisabled]
  );

  const fieldsetClasses = classNames(
    ComponentClassNames.Fieldset,
    classNameModifier(ComponentClassNames.Fieldset, variation),
    classNameModifier(ComponentClassNames.Fieldset, size),
    classNameModifierByFlag(
      ComponentClassNames.Fieldset,
      'horizontal',
      isHorizontal
    ),
    className
  );

  return (
    <FieldsetContext.Provider value={value}>
      <Flex
        as="fieldset"
        className={fieldsetClasses}
        ref={ref}
        disabled={isDisabled}
        testId={testId}
        {...rest}
      >
        <VisuallyHidden as="legend">{legend}</VisuallyHidden>
        <View
          as="div"
          aria-hidden="true"
          className={classNames(ComponentClassNames.FieldsetLegend, className, {
            [ComponentClassNames.VisuallyHidden]: legendHidden,
          })}
        >
          {legend}
        </View>

        {children}
      </Flex>
    </FieldsetContext.Provider>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/fieldset)
 */
export const Fieldset: ForwardRefPrimitive<BaseFieldsetProps, 'div'> =
  React.forwardRef(FieldsetPrimitive);

Fieldset.displayName = 'Fieldset';
