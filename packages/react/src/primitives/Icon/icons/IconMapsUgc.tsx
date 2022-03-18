import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMapsUgc } from '@aws-amplify/ui-react';` → `import { MdMapsUgc } from 'react-icons/md';`
 */
export const IconMapsUgc = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMapsUgc } from '@aws-amplify/ui-react'; → import { MdMapsUgc } from 'react-icons/md';`,
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
          d="M12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C10.82 20 9.66 19.74 8.57 19.22C8.3 19.09 8.01 19.03 7.71 19.03C7.52 19.03 7.33 19.06 7.15 19.11L3.95 20.05L4.89 16.85C5.03 16.38 4.99 15.87 4.78 15.43C4.26 14.34 4 13.18 4 12C4 7.59 7.59 4 12 4ZM12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.98 2.97 16.29L1 23L7.71 21.03C9.02 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13 8H11V11H8V13H11V16H13V13H16V11H13V8Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
