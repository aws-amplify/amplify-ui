import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconOutlinedFlag = (props) => {
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
          d="M14 6L13 4H5V21H7V14H12L13 16H20V6H14ZM18 14H14L13 12H7V6H12L13 8H18V14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
