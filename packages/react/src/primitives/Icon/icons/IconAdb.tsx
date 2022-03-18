import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAdb } from '@aws-amplify/ui-react';` → `import { MdAdb } from 'react-icons/md';`
 */
export const IconAdb = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAdb } from '@aws-amplify/ui-react'; → import { MdAdb } from 'react-icons/md';`,
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
          d="M5 15.9999C5 19.8699 8.13 22.9999 12 22.9999C15.87 22.9999 19 19.8699 19 15.9999V11.9999H5V15.9999ZM16.12 4.36994L18.22 2.26994L17.4 1.43994L15.1 3.74994C14.16 3.27994 13.12 2.99994 12 2.99994C10.88 2.99994 9.84 3.27994 8.91 3.74994L6.6 1.43994L5.78 2.26994L7.88 4.36994C6.14 5.63994 5 7.67994 5 9.99994V10.9999H19V9.99994C19 7.67994 17.86 5.63994 16.12 4.36994ZM9 8.99994C8.45 8.99994 8 8.54994 8 7.99994C8 7.44994 8.45 6.99994 9 6.99994C9.55 6.99994 10 7.44994 10 7.99994C10 8.54994 9.55 8.99994 9 8.99994ZM15 8.99994C14.45 8.99994 14 8.54994 14 7.99994C14 7.44994 14.45 6.99994 15 6.99994C15.55 6.99994 16 7.44994 16 7.99994C16 8.54994 15.55 8.99994 15 8.99994Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
