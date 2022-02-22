import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { Icon360 } from '@aws-amplify/ui-react';` → `import { Md360 } from 'react-icons/md';`
 */
export const Icon360 = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { Icon360 } from '@aws-amplify/ui-react'; → import { Md360 } from 'react-icons/md';`,
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
          d="M12 7C6.48 7 2 9.24 2 12C2 14.24 4.94 16.13 9 16.77V20L13 16L9 12V14.73C5.85 14.17 4 12.83 4 12C4 10.94 7.04 9 12 9C16.96 9 20 10.94 20 12C20 12.73 18.54 13.89 16 14.53V16.58C19.53 15.81 22 14.05 22 12C22 9.24 17.52 7 12 7V7Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
