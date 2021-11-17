import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconFastForward = (props) => {
  const { className, ...rest } = props;
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
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
          d="M15 9.86L18.03 12L15 14.14V9.86ZM6 9.86L9.03 12L6 14.14V9.86ZM13 6V18L21.5 12L13 6ZM4 6V18L12.5 12L4 6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
