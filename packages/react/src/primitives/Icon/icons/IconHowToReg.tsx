import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHowToReg } from '@aws-amplify/ui-react';` → `import { MdHowToReg } from 'react-icons/md';`
 */
export const IconHowToReg = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHowToReg } from '@aws-amplify/ui-react'; → import { MdHowToReg } from 'react-icons/md';`,
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
          d="M11 12C13.21 12 15 10.21 15 8C15 5.79 13.21 4 11 4C8.79 4 7 5.79 7 8C7 10.21 8.79 12 11 12ZM11 6C12.1 6 13 6.9 13 8C13 9.1 12.1 10 11 10C9.9 10 9 9.1 9 8C9 6.9 9.9 6 11 6ZM5 18C5.2 17.37 7.57 16.32 9.96 16.06L12 14.06C11.61 14.02 11.32 14 11 14C8.33 14 3 15.34 3 18V20H12L10 18H5ZM20.6 12.5L15.47 17.67L13.4 15.59L12 17L15.47 20.5L22 13.91L20.6 12.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
