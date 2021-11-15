import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconTerrain = (props) => {
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
          d="M14 6L9.78 11.63L11.03 13.3L14 9.33L19 16H10.54L6.53 10.63L1 18H23L14 6ZM5 16L6.52 13.97L8.04 16H5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
