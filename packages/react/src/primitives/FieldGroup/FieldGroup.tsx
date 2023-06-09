import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import {
  BaseFieldGroupOptions,
  FieldGroupOptions,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { Flex } from '../Flex';
import { View } from '../View';

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
    ? ComponentClassNames.FieldGroupHasInnerStart
    : null;
  const fieldGroupHasInnerEndClassName = hasInnerEndComponent
    ? ComponentClassNames.FieldGroupHasInnerEnd
    : null;
  const componentClasses = classNames(
    ComponentClassNames.FieldGroup,
    fieldGroupHasInnerStartClassName,
    fieldGroupHasInnerEndClassName,
    classNameModifier(ComponentClassNames.FieldGroup, orientation),
    className
  );

  return (
    <Flex
      className={componentClasses}
      data-orientation={orientation}
      ref={ref}
      {...rest}
    >
      {outerStartComponent && (
        <View
          className={classNames(
            ComponentClassNames.FieldGroupOuterStart,
            classNameModifier(
              ComponentClassNames.FieldGroupOuterStart,
              variation
            )
          )}
        >
          {outerStartComponent}
        </View>
      )}
      <View
        className={classNames(
          ComponentClassNames.FieldGroupFieldWrapper,
          classNameModifier(
            ComponentClassNames.FieldGroupFieldWrapper,
            orientation
          )
        )}
        data-orientation={orientation}
      >
        {innerStartComponent && (
          <View className={ComponentClassNames.FieldGroupInnerStart}>
            {innerStartComponent}
          </View>
        )}
        {children}
        {innerEndComponent && (
          <View className={ComponentClassNames.FieldGroupInnerEnd}>
            {innerEndComponent}
          </View>
        )}
      </View>

      {outerEndComponent && (
        <View
          className={classNames(
            ComponentClassNames.FieldGroupOuterEnd,
            classNameModifier(ComponentClassNames.FieldGroupOuterEnd, variation)
          )}
        >
          {outerEndComponent}
        </View>
      )}
    </Flex>
  );
};

export const FieldGroup: ForwardRefPrimitive<BaseFieldGroupOptions, 'div'> =
  React.forwardRef(FieldGroupPrimitive);

FieldGroup.displayName = 'FieldGroup';
