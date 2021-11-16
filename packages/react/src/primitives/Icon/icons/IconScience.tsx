import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconScience = (props) => {
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
          d="M13.0002 11.33L18.0002 18H6.00018L11.0002 11.33V6H13.0002V11.33ZM15.9602 4H8.04018C7.62018 4 7.39018 4.48 7.65018 4.81L9.00018 6.5V10.67L3.20018 18.4C2.71018 19.06 3.18018 20 4.00018 20H20.0002C20.8202 20 21.2902 19.06 20.8002 18.4L15.0002 10.67V6.5L16.3502 4.81C16.6102 4.48 16.3802 4 15.9602 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
