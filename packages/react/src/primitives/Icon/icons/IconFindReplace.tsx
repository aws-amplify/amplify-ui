import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconFindReplace = (props) => {
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
          d="M11 6C12.38 6 13.63 6.56 14.54 7.46L12 10H18V4L15.95 6.05C14.68 4.78 12.93 4 11 4C7.47 4 4.57 6.61 4.08 10H6.1C6.56 7.72 8.58 6 11 6ZM16.64 15.14C17.3 14.24 17.76 13.17 17.92 12H15.9C15.44 14.28 13.42 16 11 16C9.62 16 8.37 15.44 7.46 14.54L10 12H4V18L6.05 15.95C7.32 17.22 9.07 18 11 18C12.55 18 13.98 17.49 15.14 16.64L20 21.49L21.49 20L16.64 15.14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
