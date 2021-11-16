import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconQueueMusic = (props) => {
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
          d="M22 6H17V14.18C16.69 14.07 16.35 14 16 14C14.34 14 13 15.34 13 17C13 18.66 14.34 20 16 20C17.66 20 19 18.66 19 17V8H22V6ZM15 6H3V8H15V6ZM15 10H3V12H15V10ZM11 14H3V16H11V14ZM15 17C15 16.45 15.45 16 16 16C16.55 16 17 16.45 17 17C17 17.55 16.55 18 16 18C15.45 18 15 17.55 15 17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
