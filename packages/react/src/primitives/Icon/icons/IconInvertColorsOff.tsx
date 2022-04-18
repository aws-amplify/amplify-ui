import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconInvertColorsOff } from '@aws-amplify/ui-react';` → `import { MdInvertColorsOff } from 'react-icons/md';`
 */
export const IconInvertColorsOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconInvertColorsOff } from '@aws-amplify/ui-react'; → import { MdInvertColorsOff } from 'react-icons/md';`,
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
          d="M12 5.10002V9.15002L19.4 16.55C20.55 13.67 19.99 10.27 17.65 7.94002L12 2.27002L8.55999 5.71002L9.96999 7.12002L12 5.10002ZM4.39999 4.37002L2.98999 5.78002L5.76999 8.56002C3.22999 11.7 3.41999 16.31 6.33999 19.24C7.89999 20.8 9.94999 21.58 12 21.58C13.78 21.58 15.56 20.99 17.02 19.81L19.72 22.51L21.13 21.1L4.39999 4.37002V4.37002ZM12 19.59C10.4 19.59 8.88999 18.97 7.75999 17.83C6.61999 16.69 5.99999 15.19 5.99999 13.59C5.99999 12.27 6.42999 11.03 7.20999 10L12 14.79V19.59Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
