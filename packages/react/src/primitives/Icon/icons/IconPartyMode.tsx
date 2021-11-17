import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconPartyMode = (props) => {
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
          d="M20 4H16.83L15 2H9L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H8.05L8.64 5.35L9.88 4H14.12L15.36 5.35L15.95 6H20V18ZM9 12C9 10.34 10.34 9 12 9H15.98C15.06 7.79 13.63 7 12 7C9.24 7 7 9.24 7 12C7 12.34 7.04 12.68 7.1 13H9.18C9.07 12.69 9 12.35 9 12ZM15 12C15 13.66 13.66 15 12 15H8.02C8.94 16.21 10.37 17 12 17C14.76 17 17 14.76 17 12C17 11.66 16.97 11.32 16.9 11H14.82C14.93 11.31 15 11.65 15 12V12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
