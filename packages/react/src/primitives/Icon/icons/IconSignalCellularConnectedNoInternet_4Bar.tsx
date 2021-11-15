import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSignalCellularConnectedNoInternet_4Bar = (props) => {
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
          d="M20 18H22V10H20V18ZM20 22H22V20H20V22ZM2 22H18V8H22V2L2 22Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
