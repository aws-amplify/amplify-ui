import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconElderly = (props) => {
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
          d="M13.5 5.5C14.6 5.5 15.5 4.6 15.5 3.5C15.5 2.4 14.6 1.5 13.5 1.5C12.4 1.5 11.5 2.4 11.5 3.5C11.5 4.6 12.4 5.5 13.5 5.5ZM20 12.5V23H19V12.5C19 12.22 18.78 12 18.5 12C18.22 12 18 12.22 18 12.5V13.5H17V12.81C15.54 12.43 14.3 11.52 13.49 10.29C13.18 11.16 13 12.07 13 13C13 13.23 13.02 13.46 13.03 13.69L15 16.5V23H13V18L11.22 15.46L11 19L8 23L6.4 21.8L9 18.33V13C9 11.85 9.18 10.71 9.5 9.61L8 10.46V14H6V9.3L11.4 6.23V6.24C11.99 5.93 12.72 5.91 13.34 6.27C13.7 6.48 13.97 6.78 14.14 7.12L14.93 8.79C15.58 10.1 16.94 11 18.5 11C19.33 11 20 11.67 20 12.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
