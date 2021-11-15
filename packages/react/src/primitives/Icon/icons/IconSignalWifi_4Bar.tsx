import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSignalWifi_4Bar = (props) => {
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
          d="M12.01 21.49L23.64 7C23.19 6.66 18.71 3 12 3C5.27999 3 0.809985 6.66 0.359985 7L11.99 21.49L12 21.5L12.01 21.49V21.49Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
