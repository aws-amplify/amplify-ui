import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconRoofing = (props) => {
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
          d="M13 18H11V16H13V18ZM15 14H9V20H15V14ZM19 9.3V4H16V6.6L12 3L2 12H5L12 5.69L19 12H22L19 9.3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
