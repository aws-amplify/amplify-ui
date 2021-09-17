import classNames from 'classnames';
import * as React from 'react';
import { Flex } from '../Flex';

import { ComponentClassNames } from '../shared/constants';
import { FieldGroupOptions } from '../types';
import { View } from '../View';

export const FieldGroup: React.FC<FieldGroupOptions> = ({
  children,
  className,
  outerStartComponent,
  outerEndComponent,
  innerStartComponent,
  innerEndComponent,
  ...rest
}) => {
  // Don't apply field group has icon classnames unless an icon was provided
  const hasInnerStartComponent = innerStartComponent != null;
  const hasInnerEndComponent = innerEndComponent != null;
  const fieldGroupHasStartIconClassName = hasInnerStartComponent
    ? ComponentClassNames.FieldGroupHasInnerStart
    : null;
  const fieldGroupHasEndIconClassName = hasInnerEndComponent
    ? ComponentClassNames.FieldGroupHasInnerEnd
    : null;

  return (
    <Flex
      className={classNames(
        ComponentClassNames.FieldGroup,
        fieldGroupHasStartIconClassName,
        fieldGroupHasEndIconClassName,
        className
      )}
      {...rest}
    >
      {outerStartComponent && (
        <View className={ComponentClassNames.FieldGroupOuterStart}>
          {outerStartComponent}
        </View>
      )}
      <View className={ComponentClassNames.FieldGroupFieldWrapper}>
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
