import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconNextWeek = (props) => {
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
          d="M11 18.5L15 14.5L11 10.5L10 11.5L13 14.5L10 17.5L11 18.5ZM20 7H16V5C16 4.45 15.78 3.95 15.41 3.59C15.05 3.22 14.55 3 14 3H10C8.9 3 8 3.9 8 5V7H4C2.9 7 2 7.9 2 9V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V9C22 7.9 21.1 7 20 7ZM10 5H14V7H10V5ZM20 20H4V9H20V20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
