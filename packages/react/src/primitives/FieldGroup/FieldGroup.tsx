import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldGroupOptions, PrimitiveWithForwardRef } from '../types';
import { Flex } from '../Flex';
import { View } from '../View';

const FieldGroupPrimitive: PrimitiveWithForwardRef<
  FieldGroupOptions,
  typeof Flex
> = (
  {
    children,
    className,
    innerEndComponent,
    innerStartComponent,
    orientation = 'horizontal',
    outerEndComponent,
    outerStartComponent,
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

  return (
    <Flex
      className={classNames(
        ComponentClassNames.FieldGroup,
        fieldGroupHasInnerStartClassName,
        fieldGroupHasInnerEndClassName,
        className
      )}
      data-orientation={orientation}
      ref={ref}
      {...rest}
    >
      {outerStartComponent && (
        <View className={ComponentClassNames.FieldGroupOuterStart}>
          {outerStartComponent}
        </View>
      )}
      <View
        className={ComponentClassNames.FieldGroupFieldWrapper}
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
        <View className={ComponentClassNames.FieldGroupOuterEnd}>
          {outerEndComponent}
        </View>
      )}
    </Flex>
  );
};

export const FieldGroup = React.forwardRef(FieldGroupPrimitive);

FieldGroup.displayName = 'FieldGroup';
