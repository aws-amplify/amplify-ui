import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconExtension } from '@aws-amplify/ui-react';` → `import { MdExtension } from 'react-icons/md';`
 */
export const IconExtension = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconExtension } from '@aws-amplify/ui-react'; → import { MdExtension } from 'react-icons/md';`,
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
          d="M10.5 4.5C10.78 4.5 11 4.72 11 5V7H17V13H19C19.28 13 19.5 13.22 19.5 13.5C19.5 13.78 19.28 14 19 14H17V20H14.88C14.2 18.25 12.49 17 10.5 17C8.51 17 6.8 18.25 6.12 20H4V17.88C5.75 17.2 7 15.49 7 13.5C7 11.51 5.76 9.8 4.01 9.12L4 7H10V5C10 4.72 10.22 4.5 10.5 4.5ZM10.5 2.5C9.12 2.5 8 3.62 8 5H4C2.9 5 2.01 5.9 2.01 7V10.8H2.3C3.79 10.8 5 12.01 5 13.5C5 14.99 3.79 16.2 2.3 16.2H2V20C2 21.1 2.9 22 4 22H7.8V21.7C7.8 20.21 9.01 19 10.5 19C11.99 19 13.2 20.21 13.2 21.7V22H17C18.1 22 19 21.1 19 20V16C20.38 16 21.5 14.88 21.5 13.5C21.5 12.12 20.38 11 19 11V7C19 5.9 18.1 5 17 5H13C13 3.62 11.88 2.5 10.5 2.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
