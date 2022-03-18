import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSportsBar } from '@aws-amplify/ui-react';` → `import { MdSportsBar } from 'react-icons/md';`
 */
export const IconSportsBar = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSportsBar } from '@aws-amplify/ui-react'; → import { MdSportsBar } from 'react-icons/md';`,
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
          d="M15 19H8V12.37C9.26 12.03 10.11 11.1 10.77 10.38C11.6 9.47002 12.08 9.00002 13 9.00002H15V19ZM10 2.02002C8.11 2.02002 6.49 3.13002 5.73 4.73002C4.15 5.26002 3 6.74002 3 8.50002C3 10.36 4.28 11.91 6 12.36V21H17V19H19C20.1 19 21 18.1 21 17V11C21 9.90002 20.1 9.00002 19 9.00002H17.44C17.79 8.41002 18 7.73002 18 7.00002C18 4.79002 16.21 3.00002 14 3.00002C13.66 3.00002 13.34 3.05002 13.02 3.13002C12.2 2.45002 11.16 2.02002 10 2.02002ZM7 10.5C5.9 10.5 5 9.60002 5 8.50002C5 7.65002 5.55 6.90002 6.37 6.62002L7.17 6.35002L7.53 5.59002C8 4.62002 8.94 4.02002 10 4.02002C10.79 4.02002 11.39 4.37002 11.74 4.67002L12.52 5.32002C12.52 5.32002 13.16 5.00002 13.99 5.00002C15.09 5.00002 15.99 5.90002 15.99 7.00002H12.99C9.67 7.00002 9.15 10.5 7 10.5ZM17 17V11H19V17H17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
