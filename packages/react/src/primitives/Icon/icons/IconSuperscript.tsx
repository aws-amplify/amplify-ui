import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSuperscript = (props) => {
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
          d="M21.9999 7H19.9999V8H22.9999V9H18.9999V7C18.9999 6.45 19.4499 6 19.9999 6H21.9999V5H18.9999V4H21.9999C22.5499 4 22.9999 4.45 22.9999 5V6C22.9999 6.55 22.5499 7 21.9999 7ZM5.87988 20H8.53988L11.9399 14.58H12.0599L15.4599 20H18.1199L13.4699 12.73L17.8099 6H15.1299L12.0599 10.99H11.9399L8.84988 6H6.18988L10.5099 12.73L5.87988 20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
