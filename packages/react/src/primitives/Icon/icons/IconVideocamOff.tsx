import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVideocamOff } from '@aws-amplify/ui-react';` → `import { MdVideocamOff } from 'react-icons/md';`
 */
export const IconVideocamOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconVideocamOff } from '@aws-amplify/ui-react'; → import { MdVideocamOff } from 'react-icons/md';`,
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
          d="M9.56 7.99986L7.56 5.99986L3.41 1.85986L2 3.26986L4.73 5.99986H4C3.45 5.99986 3 6.44986 3 6.99986V16.9999C3 17.5499 3.45 17.9999 4 17.9999H16C16.21 17.9999 16.39 17.9199 16.55 17.8199L19.73 20.9999L21.14 19.5899L12.28 10.7299L9.56 7.99986ZM5 15.9999V7.99986H6.73L14.73 15.9999H5ZM15 7.99986V10.6099L21 16.6099V6.49986L17 10.4999V6.99986C17 6.44986 16.55 5.99986 16 5.99986H10.39L12.39 7.99986H15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
