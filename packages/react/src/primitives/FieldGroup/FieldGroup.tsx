import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
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
  const fieldGroupHasInnerStartClassName = hasInnerStartComponent
    ? ComponentClassName.FieldGroupHasInnerStart
    : null;
  const fieldGroupHasInnerEndClassName = hasInnerEndComponent
    ? ComponentClassName.FieldGroupHasInnerEnd
    : null;
  const componentClasses = classNames(
    ComponentClassName.FieldGroup,
    fieldGroupHasInnerStartClassName,
    fieldGroupHasInnerEndClassName,
    classNameModifier(ComponentClassName.FieldGroup, orientation),
    className
  );

  return (
    <Flex className={componentClasses} ref={ref} {...rest}>
      {outerStartComponent && (
        <View
          className={classNames(
            ComponentClassName.FieldGroupOuterStart,
            classNameModifier(
              ComponentClassName.FieldGroupOuterStart,
              variation
            )
          )}
        >
          {outerStartComponent}
        </View>
      )}
      <View
        className={classNames(
          ComponentClassName.FieldGroupFieldWrapper,
          classNameModifier(
            ComponentClassName.FieldGroupFieldWrapper,
            orientation
          )
        )}
      >
        {innerStartComponent && (
          <View className={ComponentClassName.FieldGroupInnerStart}>
            {innerStartComponent}
          </View>
        )}
        {children}
        {innerEndComponent && (
          <View className={ComponentClassName.FieldGroupInnerEnd}>
            {innerEndComponent}
          </View>
        )}
      </View>

      {outerEndComponent && (
        <View
          className={classNames(
            ComponentClassName.FieldGroupOuterEnd,
            classNameModifier(ComponentClassName.FieldGroupOuterEnd, variation)
          )}
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
