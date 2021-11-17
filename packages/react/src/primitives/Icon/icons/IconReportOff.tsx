import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconReportOff = (props) => {
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
          d="M9.09997 5H14.9L19 9.1V14.9L18.78 15.12L20.2 16.53L21 15.73V8.27L15.73 3H8.26997L7.46997 3.8L8.87997 5.22L9.09997 5Z"
          fill="currentColor"
        />
        <path
          d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
          fill="black"
        />
        <path
          d="M13 9.33008V7.00008H11V7.33008L13 9.33008ZM2.41 1.58008L1 2.99008L4.64 6.63008L3 8.27008V15.7301L8.27 21.0001H15.73L17.37 19.3601L21.01 23.0001L22.42 21.5901L2.41 1.58008ZM14.9 19.0001H9.1L5 14.9001V9.10008L6.05 8.05008L15.95 17.9501L14.9 19.0001Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
