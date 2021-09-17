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
  const hasFieldGroupStartIcon = innerStartComponent != null;
  const hasFieldGroupEndIcon = innerEndComponent != null;
  const fieldGroupHasStartIconClassName = hasFieldGroupStartIcon
    ? ComponentClassNames.FieldGroupHasStartIcon
    : null;
  const fieldGroupHasEndIconClassName = hasFieldGroupEndIcon
    ? ComponentClassNames.FieldGroupHasEndIcon
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
        <View className={ComponentClassNames.FieldGroupStart}>
          {outerStartComponent}
        </View>
      )}
      <View className={ComponentClassNames.FieldGroupFieldWrapper}>
        {innerStartComponent && (
          <View className={ComponentClassNames.FieldGroupStartIcon}>
            {innerStartComponent}
          </View>
        )}
        {children}
        {innerEndComponent && (
          <View className={ComponentClassNames.FieldGroupEndIcon}>
            {innerEndComponent}
          </View>
        )}
      </View>

      {outerEndComponent && (
        <View className={ComponentClassNames.FieldGroupEnd}>
          {outerEndComponent}
        </View>
      )}
    </Flex>
  );
};
