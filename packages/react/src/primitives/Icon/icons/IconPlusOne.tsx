import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconPlusOne = (props) => {
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
          d="M10 8H8V12H4V14H8V18H10V14H14V12H10V8ZM14.5 6.08V7.9L17 7.4V18H19V5L14.5 6.08Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
