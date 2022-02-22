import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatIndentDecrease } from '@aws-amplify/ui-react';` → `import { MdFormatIndentDecrease } from 'react-icons/md';`
 */
export const IconFormatIndentDecrease = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFormatIndentDecrease } from '@aws-amplify/ui-react'; → import { MdFormatIndentDecrease } from 'react-icons/md';`,
  });
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
          d="M11 17H21V15H11V17ZM3 12L7 16V8L3 12ZM3 21H21V19H3V21ZM3 3V5H21V3H3ZM11 9H21V7H11V9ZM11 13H21V11H11V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
