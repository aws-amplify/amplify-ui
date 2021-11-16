import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconFormatAlignJustify = (props) => {
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
          d="M3 21H21V19H3V21ZM3 17H21V15H3V17ZM3 13H21V11H3V13ZM3 9H21V7H3V9ZM3 3V5H21V3H3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
