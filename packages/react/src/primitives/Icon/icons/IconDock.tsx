import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconDock = (props) => {
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
          d="M8 23H16V21H8V23ZM16 1.01L8 1C6.9 1 6 1.9 6 3V17C6 18.1 6.9 19 8 19H16C17.1 19 18 18.1 18 17V3C18 1.9 17.1 1.01 16 1.01V1.01ZM16 15H8V5H16V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
