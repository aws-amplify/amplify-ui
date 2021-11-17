import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconMuseum = (props) => {
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
          d="M22 11V9L12 2L2 9V11H4V20H2V22H22V20H20V11H22ZM18 20H6V9H18V20Z"
          fill="currentColor"
        />
        <path
          d="M10 14L12 17L14 14V18H16V11H14L12 14L10 11H8V18H10V14Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
