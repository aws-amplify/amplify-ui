import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVerifiedUser } from '@aws-amplify/ui-react';` → `import { MdVerifiedUser } from 'react-icons/md';`
 */
export const IconVerifiedUser = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconVerifiedUser } from '@aws-amplify/ui-react'; → import { MdVerifiedUser } from 'react-icons/md';`,
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
          d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM19 11C19 15.52 16.02 19.69 12 20.93C7.98 19.69 5 15.52 5 11V6.3L12 3.19L19 6.3V11ZM7.41 11.59L6 13L10 17L18 9L16.59 7.58L10 14.17L7.41 11.59Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
