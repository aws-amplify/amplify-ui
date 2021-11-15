import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconShopTwo = (props) => {
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
          d="M3 9H1V20C1 21.11 1.89 22 3 22H17C18.11 22 19 21.11 19 20H3V9ZM18 5V3C18 1.89 17.11 1 16 1H12C10.89 1 10 1.89 10 3V5H5V16C5 17.11 5.89 18 7 18H21C22.11 18 23 17.11 23 16V5H18ZM12 3H16V5H12V3ZM21 16H7V7H21V16ZM12 15L17.5 11L12 8V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
