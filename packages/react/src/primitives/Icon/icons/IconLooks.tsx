import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLooks } from '@aws-amplify/ui-react';` → `import { MdLooks } from 'react-icons/md';`
 */
export const IconLooks = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLooks } from '@aws-amplify/ui-react'; → import { MdLooks } from 'react-icons/md';`,
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
          d="M12 10C8.14 10 5 13.14 5 17H7C7 14.24 9.24 12 12 12C14.76 12 17 14.24 17 17H19C19 13.14 15.86 10 12 10ZM12 6C5.93 6 1 10.93 1 17H3C3 12.04 7.04 8 12 8C16.96 8 21 12.04 21 17H23C23 10.93 18.07 6 12 6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
