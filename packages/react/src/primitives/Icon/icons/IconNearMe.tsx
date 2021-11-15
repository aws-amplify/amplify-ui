import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconNearMe = (props) => {
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
          d="M17.27 6.73L13.03 16.86L11.71 13.44L11.39 12.61L10.57 12.29L7.14 10.96L17.27 6.73V6.73ZM21 3L3 10.53V11.51L9.84 14.16L12.48 21H13.46L21 3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
