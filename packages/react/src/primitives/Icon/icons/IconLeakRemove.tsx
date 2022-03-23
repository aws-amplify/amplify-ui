import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLeakRemove } from '@aws-amplify/ui-react';` → `import { MdLeakRemove } from 'react-icons/md';`
 */
export const IconLeakRemove = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLeakRemove } from '@aws-amplify/ui-react'; → import { MdLeakRemove } from 'react-icons/md';`,
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
          d="M14 2.99986H12C12 4.34986 11.69 5.62986 11.16 6.76986L12.65 8.25986C13.51 6.69986 14 4.90986 14 2.99986ZM21 11.9999V9.99986C19.09 9.99986 17.3 10.4899 15.73 11.3499L17.22 12.8399C18.37 12.3099 19.65 11.9999 21 11.9999ZM21 15.9999V13.9999C20.21 13.9999 19.46 14.1299 18.76 14.3699L20.44 16.0499C20.63 16.0399 20.81 15.9999 21 15.9999V15.9999ZM10 2.99986H8C8 3.18986 7.96 3.36986 7.94 3.55986L9.62 5.23986C9.87 4.53986 10 3.77986 10 2.99986V2.99986ZM4.41 2.85986L3 4.26986L5.84 7.10986C5.03 7.66986 4.06 7.99986 3 7.99986V9.99986C4.61 9.99986 6.09 9.44986 7.27 8.53986L8.7 9.96986C7.14 11.2399 5.16 11.9999 3 11.9999V13.9999C5.72 13.9999 8.2 13.0099 10.11 11.3799L12.62 13.8899C10.99 15.8099 10 18.2899 10 20.9999H12C12 18.8399 12.76 16.8599 14.03 15.2999L15.46 16.7299C14.55 17.9099 14 19.3899 14 20.9999H16C16 19.9399 16.33 18.9699 16.89 18.1599L19.73 20.9999L21.14 19.5899L4.41 2.85986Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
