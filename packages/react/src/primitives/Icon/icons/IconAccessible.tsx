import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAccessible } from '@aws-amplify/ui-react';` → `import { MdAccessible } from 'react-icons/md';`
 */
export const IconAccessible = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAccessible } from '@aws-amplify/ui-react'; → import { MdAccessible } from 'react-icons/md';`,
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
          d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z"
          fill="currentColor"
        />
        <path
          d="M19 12.9999V10.9999C17.46 11.0199 15.91 10.2499 14.93 9.16992L13.64 7.73992C13.47 7.54992 13.26 7.39992 13.03 7.28992C13.02 7.28992 13.02 7.27992 13.01 7.27992H13C12.65 7.07992 12.25 6.97992 11.81 7.01992C10.76 7.10992 10 8.03992 10 9.08992V14.9999C10 16.0999 10.9 16.9999 12 16.9999H17V21.9999H19V16.4999C19 15.3999 18.1 14.4999 17 14.4999H14V11.0499C15.29 12.1199 17.25 12.9899 19 12.9999ZM10 19.9999C8.34 19.9999 7 18.6599 7 16.9999C7 15.6899 7.84 14.5899 9 14.1699V12.0999C6.72 12.5599 5 14.5799 5 16.9999C5 19.7599 7.24 21.9999 10 21.9999C12.42 21.9999 14.44 20.2799 14.9 17.9999H12.83C12.42 19.1599 11.31 19.9999 10 19.9999Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
