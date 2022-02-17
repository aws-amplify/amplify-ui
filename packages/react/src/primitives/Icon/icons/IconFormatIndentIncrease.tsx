import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatIndentIncrease } from '@aws-amplify/ui-react';` → `import { MdFormatIndentIncrease } from 'react-icons/md';`
 */
export const IconFormatIndentIncrease = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFormatIndentIncrease');
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
          d="M3 21H21V19H3V21ZM3 8V16L7 12L3 8ZM11 17H21V15H11V17ZM3 3V5H21V3H3ZM11 9H21V7H11V9ZM11 13H21V11H11V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
