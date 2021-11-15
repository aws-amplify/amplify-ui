import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconDoubleArrow = (props) => {
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
          d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z"
          fill="currentColor"
        />
        <path d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z" fill="black" />
      </svg>
    </View>
  );
};
