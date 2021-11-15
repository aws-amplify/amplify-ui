import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconWash = (props) => {
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
          d="M20.75 16C21.44 16 22 15.44 22 14.75C22 14.06 21.44 13.5 20.75 13.5H12V12.5H18.75C19.44 12.5 20 11.94 20 11.25C20 10.58 19.47 10.05 18.82 10.01L8.87 10L10.35 7.4C10.44 7.23 10.49 7.06 10.49 6.86C10.49 6.6 10.4 6.36 10.23 6.16L9.12 5L1.94 11.8C1.34 12.36 1 13.15 1 13.97V20C1 21.66 2.34 23 4 23H17.75C18.44 23 19 22.44 19 21.75C19 21.06 18.44 20.5 17.75 20.5H12V19.5H19.75C20.44 19.5 21 18.94 21 18.25C21 17.56 20.44 17 19.75 17H12V16H20.75ZM10 21H4C3.45 21 3 20.55 3 20V14C3 13.61 3.23 13.36 3.36 13.25L7 9.87V12H10V21ZM13.5 9C14.33 9 15 8.33 15 7.5C15 6.66 13.5 5 13.5 5C13.5 5 12 6.66 12 7.5C12 8.33 12.67 9 13.5 9ZM18.5 1C18.5 1 16 3.83 16 5.5C16 6.88 17.12 8 18.5 8C19.88 8 21 6.88 21 5.5C21 3.83 18.5 1 18.5 1ZM18.5 6.5C17.95 6.5 17.5 6.05 17.5 5.5C17.5 5.1 17.93 4.28 18.5 3.45C19.07 4.28 19.5 5.1 19.5 5.5C19.5 6.05 19.05 6.5 18.5 6.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
