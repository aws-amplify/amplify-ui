import classNames from 'classnames';

import { Flex } from '../Flex';
import { ComponentClassNames } from '../shared/constants';
import { FieldGroupOptions, Primitive } from '../types';
import { View } from '../View';

export const FieldGroup: Primitive<FieldGroupOptions, typeof Flex> = ({
  children,
  className,
  orientation = 'horizontal',
  outerStartComponent,
  outerEndComponent,
  innerStartComponent,
  innerEndComponent,
  ...rest
}) => {
  // Don't apply field group has icon classnames unless an icon was provided
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

FieldGroup.displayName = 'FieldGroup';
