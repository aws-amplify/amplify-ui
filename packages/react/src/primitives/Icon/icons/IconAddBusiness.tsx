import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconAddBusiness = (props) => {
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
        <path d="M17 4H2V6H17V4Z" fill="currentColor" />
        <path
          d="M15 17H17V14H18V12L17 7H2L1 12V14H2V20H11V14H15V17ZM9 18H4V14H9V18ZM3.04 12L3.64 9H15.36L15.96 12H3.04Z"
          fill="black"
        />
        <path d="M23 18H20V15H18V18H15V20H18V23H20V20H23V18Z" fill="black" />
      </svg>
    </View>
  );
};
