import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconLabelImportant = (props) => {
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
          d="M4 18.99H15C15.67 18.99 16.27 18.67 16.63 18.16L21 12L16.63 5.84C16.27 5.33 15.67 5 15 5H4L9 12L4 18.99V18.99Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
