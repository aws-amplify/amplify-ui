import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTapAndPlay } from '@aws-amplify/ui-react';` → `import { MdTapAndPlay } from 'react-icons/md';`
 */
export const IconTapAndPlay = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTapAndPlay } from '@aws-amplify/ui-react'; → import { MdTapAndPlay } from 'react-icons/md';`,
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
          d="M2 16V18C4.76 18 7 20.24 7 23H9C9 19.13 5.87 16 2 16ZM2 20V23H5C5 21.34 3.66 20 2 20ZM2 12V14C6.97 14 11 18.03 11 23H13C13 16.92 8.08 12 2 12ZM17 1.01L7 1C5.9 1 5 1.9 5 3V10.37C5.69 10.53 6.36 10.74 7 11.01V5H17V18H13.97C14.49 19.25 14.81 20.59 14.92 22H17C18.1 22 19 21.1 19 20V3C19 1.9 18.1 1.01 17 1.01Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
