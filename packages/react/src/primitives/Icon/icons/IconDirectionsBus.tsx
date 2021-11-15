import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconDirectionsBus = (props) => {
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
          d="M12 2C7.58 2 4 2.5 4 6V16C4 16.88 4.39 17.67 5 18.22V20C5 20.55 5.45 21 6 21H7C7.55 21 8 20.55 8 20V19H16V20C16 20.55 16.45 21 17 21H18C18.55 21 19 20.55 19 20V18.22C19.61 17.67 20 16.88 20 16V6C20 2.5 16.42 2 12 2ZM17.66 4.99H6.34C6.89 4.46 8.31 4 12 4C15.69 4 17.11 4.46 17.66 4.99ZM18 6.99V10H6V6.99H18ZM17.66 16.73L17.37 17H6.63L6.34 16.73C6.21 16.62 6 16.37 6 16V12H18V16C18 16.37 17.79 16.62 17.66 16.73Z"
          fill="currentColor"
        />
        <path
          d="M8.5 16C9.32843 16 10 15.3284 10 14.5C10 13.6716 9.32843 13 8.5 13C7.67157 13 7 13.6716 7 14.5C7 15.3284 7.67157 16 8.5 16Z"
          fill="black"
        />
        <path
          d="M15.5 16C16.3284 16 17 15.3284 17 14.5C17 13.6716 16.3284 13 15.5 13C14.6716 13 14 13.6716 14 14.5C14 15.3284 14.6716 16 15.5 16Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
