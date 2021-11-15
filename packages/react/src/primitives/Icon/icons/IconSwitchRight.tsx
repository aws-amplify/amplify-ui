import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSwitchRight = (props) => {
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
        <g clip-path="url(#clip0_1020_41339)">
          <path
            d="M15.5 15.38V8.62L18.88 12L15.5 15.38ZM14 19L21 12L14 5V19ZM10 19V5L3 12L10 19Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1020_41339">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </View>
  );
};
