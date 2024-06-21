import * as React from 'react';
import { fieldsetClasses } from '@aws-amplify/ui';

import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

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
    variation = 'plain',
    ...rest
  },
  ref
) => {
  const { isFieldsetDisabled } = useFieldset();

  // Fieldsets that are nested within a disabled Fieldset should
  // also be disabled.
  const shouldBeDisabled = isFieldsetDisabled ? isFieldsetDisabled : isDisabled;
  const value = React.useMemo(
    () => ({
      isFieldsetDisabled: shouldBeDisabled,
    }),
    [shouldBeDisabled]
  );

  return (
    <FieldsetContext.Provider value={value}>
      <Flex
        as="fieldset"
        className={fieldsetClasses(
          {
            _modifiers: [variation, size],
          },
          [className]
        )}
        ref={ref}
        disabled={shouldBeDisabled}
        testId={testId}
        {...rest}
      >
        <VisuallyHidden as="legend">{legend}</VisuallyHidden>
        <View
          as="div"
          aria-hidden="true"
          className={fieldsetClasses(
            {
              _element: {
                legend: [size],
              },
            },
            [legendHidden ? 'amplify-visually-hidden' : undefined]
          )}
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
export const Fieldset: ForwardRefPrimitive<BaseFieldsetProps, 'fieldset'> =
  primitiveWithForwardRef(FieldsetPrimitive);

Fieldset.displayName = 'Fieldset';
