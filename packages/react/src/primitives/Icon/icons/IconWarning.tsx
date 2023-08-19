import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../../shared/constants';
import { InternalIconProps, BaseInternalIconProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../../types';
import { View } from '../../View';

const IconWarningPrimitive: Primitive<InternalIconProps, typeof View> = (
  { className, ...rest },
  ref
) => {
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      ref={ref}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};

export const IconWarning: ForwardRefPrimitive<BaseInternalIconProps, 'div'> =
  React.forwardRef(IconWarningPrimitive);

IconWarning.displayName = 'IconCheckCircle';
