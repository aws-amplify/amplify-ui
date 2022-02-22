import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBorderOuter } from '@aws-amplify/ui-react';` → `import { MdBorderOuter } from 'react-icons/md';`
 */
export const IconBorderOuter = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBorderOuter } from '@aws-amplify/ui-react'; → import { MdBorderOuter } from 'react-icons/md';`,
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
          d="M13 7H11V9H13V7ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM3 3V21H21V3H3ZM19 19H5V5H19V19ZM13 15H11V17H13V15ZM9 11H7V13H9V11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
