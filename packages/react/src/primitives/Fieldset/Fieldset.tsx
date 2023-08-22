import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { classNameModifier } from '../shared/utils';

import { Flex } from '../Flex';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';

import {
  FieldsetProps,
  BaseFieldsetProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { FieldsetContext, useFieldset } from './useFieldset';

const FieldsetPrimitive: Primitive<FieldsetProps, 'fieldset'> = (
  {
    children,
    className,
    isDisabled,
    legend,
    legendHidden,
    size,
    testId,
    variation = 'outlined',
    ...rest
  },
  ref
) => {
  const { isDisabled: isDisabledByFieldset, isNestedFieldset } = useFieldset();

  // Fieldsets that are nested within a disabled Fieldset should
  // also be disabled.
  const shouldBeDisabled =
    isNestedFieldset && isDisabledByFieldset
      ? isDisabledByFieldset
      : isDisabled;
  const value = React.useMemo(
    () => ({
      // Set isNestedFieldset to true so we can detect nested Fieldsets.
      isNestedFieldset: true,
      isDisabled: shouldBeDisabled,
    }),
    [shouldBeDisabled]
  );

  const fieldsetClasses = classNames(
    ComponentClassNames.Fieldset,
    classNameModifier(ComponentClassNames.Fieldset, variation),
    classNameModifier(ComponentClassNames.Fieldset, size),
    className
  );

  const legendClasses = classNames(
    ComponentClassNames.FieldsetLegend,
    classNameModifier(ComponentClassNames.FieldsetLegend, size),
    className,
    {
      [ComponentClassNames.VisuallyHidden]: legendHidden,
    }
  );

  return (
    <FieldsetContext.Provider value={value}>
      <Flex
        as="fieldset"
        className={fieldsetClasses}
        ref={ref}
        disabled={shouldBeDisabled}
        testId={testId}
        {...rest}
      >
        <VisuallyHidden as="legend">{legend}</VisuallyHidden>
        <View as="div" aria-hidden="true" className={legendClasses}>
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
