import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconPublish = (props) => {
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
          d="M5 4H19V6H5V4ZM5 14H9V20H15V14H19L12 7L5 14ZM13 12V18H11V12H9.83L12 9.83L14.17 12H13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
