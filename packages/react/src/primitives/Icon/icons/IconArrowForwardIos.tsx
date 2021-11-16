import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconArrowForwardIos = (props) => {
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
          d="M6.49023 20.1301L8.26023 21.9001L18.1602 12.0001L8.26023 2.1001L6.49023 3.8701L14.6202 12.0001L6.49023 20.1301V20.1301Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
