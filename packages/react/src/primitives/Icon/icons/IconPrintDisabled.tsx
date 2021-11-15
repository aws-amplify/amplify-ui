import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconPrintDisabled = (props) => {
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
          d="M1.41 1.6001L0 3.0101L5 8.0001C3.34 8.0001 2 9.3401 2 11.0001V17.0001H6V21.0001H18L20.95 23.9601L22.36 22.5501L1.41 1.6001ZM6 15.0001H4V11.0001C4 10.4501 4.45 10.0001 5 10.0001H7L10 13.0001H6V15.0001ZM8 19.0001V15.0001H12L16 19.0001H8ZM8 5.0001H16V8.0001H10.66L12.66 10.0001H19C19.55 10.0001 20 10.4501 20 11.0001V15.0001L18 15.0101V13.0001H15.66L19.66 17.0001H22V11.0001C22 9.3401 20.66 8.0001 19 8.0001H18V3.0001H6V3.3601L8 5.3601V5.0001Z"
          fill="currentColor"
        />
        <path
          d="M18 12.5098C18.5523 12.5098 19 12.0621 19 11.5098C19 10.9575 18.5523 10.5098 18 10.5098C17.4477 10.5098 17 10.9575 17 11.5098C17 12.0621 17.4477 12.5098 18 12.5098Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
