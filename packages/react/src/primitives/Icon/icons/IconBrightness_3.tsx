import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconBrightness_3 = (props) => {
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
          d="M12.7 4.91C15.25 6.24 17 8.92 17 12C17 15.08 15.25 17.76 12.7 19.09C14.16 17.09 15 14.63 15 12C15 9.37 14.16 6.91 12.7 4.91ZM9 2C7.95 2 6.95 2.16 6 2.46C10.06 3.73 13 7.52 13 12C13 16.48 10.06 20.27 6 21.54C6.95 21.84 7.95 22 9 22C14.52 22 19 17.52 19 12C19 6.48 14.52 2 9 2Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
