import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNature } from '@aws-amplify/ui-react';` → `import { MdNature } from 'react-icons/md';`
 */
export const IconNature = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNature } from '@aws-amplify/ui-react'; → import { MdNature } from 'react-icons/md';`,
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
          d="M13 16.1199H12.97C16.46 15.7199 19.17 12.7599 19.17 9.16992C19.17 5.29992 16.04 2.16992 12.17 2.16992C8.3 2.16992 5.17 5.29992 5.17 9.16992C5.17 12.6399 7.69 15.5099 11 16.0599V19.9999H5V21.9999H19V19.9999H13V16.1199ZM7.17 9.16992C7.17 6.40992 9.41 4.16992 12.17 4.16992C14.93 4.16992 17.17 6.40992 17.17 9.16992C17.17 11.9299 14.93 14.1699 12.17 14.1699C9.41 14.1699 7.17 11.9299 7.17 9.16992V9.16992Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
