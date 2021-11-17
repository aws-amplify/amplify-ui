import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconAlarm = (props) => {
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
          d="M12.5 8.00006H11V14.0001L15.75 16.8501L16.5 15.6201L12.5 13.2501V8.00006ZM17.337 1.81006L21.944 5.65506L20.664 7.19006L16.054 3.34706L17.337 1.81006ZM6.66301 1.81006L7.94501 3.34606L3.33701 7.19006L2.05701 5.65406L6.66301 1.81006ZM12 4.00006C7.03001 4.00006 3.00001 8.03006 3.00001 13.0001C3.00001 17.9701 7.03001 22.0001 12 22.0001C16.97 22.0001 21 17.9701 21 13.0001C21 8.03006 16.97 4.00006 12 4.00006ZM12 20.0001C8.14001 20.0001 5.00001 16.8601 5.00001 13.0001C5.00001 9.14006 8.14001 6.00006 12 6.00006C15.86 6.00006 19 9.14006 19 13.0001C19 16.8601 15.86 20.0001 12 20.0001Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
