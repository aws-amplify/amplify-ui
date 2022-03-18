import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNat } from '@aws-amplify/ui-react';` → `import { MdNat } from 'react-icons/md';`
 */
export const IconNat = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNat } from '@aws-amplify/ui-react'; → import { MdNat } from 'react-icons/md';`,
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
          d="M6.82 13H11V11H6.82C6.4 9.84 5.3 9 4 9C2.34 9 1 10.34 1 12C1 13.66 2.34 15 4 15C5.3 15 6.4 14.16 6.82 13ZM4 13C3.45 13 3 12.55 3 12C3 11.45 3.45 11 4 11C4.55 11 5 11.45 5 12C5 12.55 4.55 13 4 13Z"
          fill="currentColor"
        />
        <path
          d="M23 12L19 9V11H14.95C14.45 5.95 10.19 2 5 2V4C9.42 4 13 7.58 13 12C13 16.42 9.42 20 5 20V22C10.19 22 14.45 18.05 14.95 13H19V15L23 12Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
