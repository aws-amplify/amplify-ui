import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconCrop_7_5 = (props) => {
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
          d="M19 7H5C3.9 7 3 7.9 3 9V15C3 16.1 3.9 17 5 17H19C20.1 17 21 16.1 21 15V9C21 7.9 20.1 7 19 7ZM19 15H5V9H19V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
