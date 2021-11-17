import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconRotateLeft = (props) => {
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
          d="M7.11007 8.53L5.70007 7.11C4.80007 8.27 4.24007 9.61 4.07007 11H6.09007C6.23007 10.13 6.58007 9.28 7.11007 8.53V8.53ZM6.09007 13H4.07007C4.24007 14.39 4.79007 15.73 5.69007 16.89L7.10007 15.47C6.58007 14.72 6.23007 13.88 6.09007 13V13ZM7.10007 18.32C8.26007 19.22 9.61007 19.76 11.0001 19.93V17.9C10.1301 17.75 9.29007 17.41 8.54007 16.87L7.10007 18.32ZM13.0001 4.07V1L8.45007 5.55L13.0001 10V6.09C15.8401 6.57 18.0001 9.03 18.0001 12C18.0001 14.97 15.8401 17.43 13.0001 17.91V19.93C16.9501 19.44 20.0001 16.08 20.0001 12C20.0001 7.92 16.9501 4.56 13.0001 4.07Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
