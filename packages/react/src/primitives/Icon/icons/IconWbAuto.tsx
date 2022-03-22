import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWbAuto } from '@aws-amplify/ui-react';` → `import { MdWbAuto } from 'react-icons/md';`
 */
export const IconWbAuto = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWbAuto } from '@aws-amplify/ui-react'; → import { MdWbAuto } from 'react-icons/md';`,
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
          d="M7 7L3.8 16H5.7L6.4 14H9.6L10.3 16H12.2L9 7H7ZM6.85 12.65L8 9L9.15 12.65H6.85V12.65ZM22 7L20.8 13.29L19.3 7H17.7L16.21 13.29L15 7H14.24L14.23 7.01C12.76 5.18 10.53 4 8 4C3.58 4 0 7.58 0 12C0 16.42 3.58 20 8 20C10.96 20 13.55 18.39 14.93 16C14.96 15.94 14.98 15.88 15.01 15.82C15.06 15.74 15.1 15.65 15.15 15.57L15.25 16H17L18.5 9.9L20 16H21.75L23.8 7H22ZM13.37 14.67C12.38 16.64 10.35 18 8 18C4.69 18 2 15.31 2 12C2 8.69 4.69 6 8 6C11.31 6 14 8.69 14 12C14 12.96 13.77 13.86 13.37 14.67Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
