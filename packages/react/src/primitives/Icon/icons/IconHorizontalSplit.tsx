import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconHorizontalSplit = (props) => {
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
          d="M19 15V17H5V15H19ZM21 5H3V7H21V5ZM21 9H3V11H21V9ZM21 13H3V19H21V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
