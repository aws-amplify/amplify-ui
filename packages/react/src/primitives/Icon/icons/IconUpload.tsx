import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconUpload = (props) => {
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
          d="M9 16H15V10H19L12 3L5 10H9V16ZM12 5.83L14.17 8H13V14H11V8H9.83L12 5.83ZM5 18H19V20H5V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
