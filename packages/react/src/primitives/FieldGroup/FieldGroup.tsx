import * as React from 'react';
import { fieldGroupClasses } from '@aws-amplify/ui';

import {
  BaseFieldGroupOptions,
  FieldGroupOptions,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { Flex } from '../Flex';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const FieldGroupPrimitive: Primitive<FieldGroupOptions, 'div'> = (
  {
    children,
    className,
    innerEndComponent,
    innerStartComponent,
    orientation = 'horizontal',
    outerEndComponent,
    outerStartComponent,
    variation,
    ...rest
  },
  ref
) => {
  // Don't apply hasInner classnames unless a component was provided
  const hasInnerStartComponent = innerStartComponent != null;
  const hasInnerEndComponent = innerEndComponent != null;

  return (
    <Flex
      className={fieldGroupClasses(
        {
          _modifiers: [
            orientation,
            hasInnerEndComponent ? 'has-inner-end' : undefined,
            hasInnerStartComponent ? 'has-inner-start' : undefined,
          ],
        },
        [className]
      )}
      ref={ref}
      {...rest}
    >
      {outerStartComponent && (
        <View
          className={fieldGroupClasses({
            _element: {
              'outer-start': [variation],
            },
          })}
        >
          {outerStartComponent}
        </View>
      )}
      <View
        className={fieldGroupClasses({
          _element: {
            'field-wrapper': [orientation],
          },
        })}
      >
        {innerStartComponent && (
          <View className={fieldGroupClasses({ _element: 'inner-start' })}>
            {innerStartComponent}
          </View>
        )}
        {children}
        {innerEndComponent && (
          <View className={fieldGroupClasses({ _element: 'inner-end' })}>
            {innerEndComponent}
          </View>
        )}
      </View>

      {outerEndComponent && (
        <View
          className={fieldGroupClasses({
            _element: {
              'outer-end': [variation],
            },
          })}
        >
          {outerEndComponent}
        </View>
      )}
    </Flex>
  );
};

export const FieldGroup: ForwardRefPrimitive<BaseFieldGroupOptions, 'div'> =
  primitiveWithForwardRef(FieldGroupPrimitive);

FieldGroup.displayName = 'FieldGroup';
