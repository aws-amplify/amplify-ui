import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconFormatPaint = (props) => {
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
          d="M18 4V3C18 2.45 17.55 2 17 2H5C4.45 2 4 2.45 4 3V7C4 7.55 4.45 8 5 8H17C17.55 8 18 7.55 18 7V6H19V10H9V21C9 21.55 9.45 22 10 22H12C12.55 22 13 21.55 13 21V12H21V4H18ZM16 6H6V4H16V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
