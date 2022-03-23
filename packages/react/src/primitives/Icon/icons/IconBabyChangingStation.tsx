import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBabyChangingStation } from '@aws-amplify/ui-react';` → `import { MdBabyChangingStation } from 'react-icons/md';`
 */
export const IconBabyChangingStation = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBabyChangingStation } from '@aws-amplify/ui-react'; → import { MdBabyChangingStation } from 'react-icons/md';`,
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
          d="M14 8V10H11L8.31 8.82L7 12.75V22H3V12L4.58 7.37C4.96 6.25 6.22 5.69 7.3 6.18L11.45 8.01L14 8ZM8 1C6.9 1 6 1.9 6 3C6 4.1 6.9 5 8 5C9.1 5 10 4.1 10 3C10 1.9 9.1 1 8 1ZM9 19H21V17H9V19ZM19.5 16C20.33 16 21 15.33 21 14.5C21 13.67 20.33 13 19.5 13C18.67 13 18 13.67 18 14.5C18 15.33 18.67 16 19.5 16ZM13 12C13 11.45 12.55 11 12 11H9V13H11V14C11 15.1 11.9 16 13 16H15C16.1 16 17 15.1 17 14V11H15V13H13V12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
