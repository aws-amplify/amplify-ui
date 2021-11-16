import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconHome = (props) => {
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
          d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69V5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
