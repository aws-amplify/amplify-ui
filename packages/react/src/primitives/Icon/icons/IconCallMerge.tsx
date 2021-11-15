import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconCallMerge = (props) => {
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
          d="M17 20.41L18.41 19L15 15.59L13.59 17L17 20.41ZM7.49997 8H11V13.59L5.58997 19L6.99997 20.41L13 14.41V8H16.5L12 3.5L7.49997 8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
