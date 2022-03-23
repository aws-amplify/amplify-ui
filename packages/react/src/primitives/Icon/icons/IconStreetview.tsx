import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStreetview } from '@aws-amplify/ui-react';` → `import { MdStreetview } from 'react-icons/md';`
 */
export const IconStreetview = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconStreetview } from '@aws-amplify/ui-react'; → import { MdStreetview } from 'react-icons/md';`,
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
          d="M12.56 14.33C12.22 14.6 12 15.03 12 15.5V21H19C20.1 21 21 20.1 21 19V13.02C20.06 12.69 19.05 12.5 18 12.5C15.97 12.5 14.07 13.2 12.56 14.33V14.33Z"
          fill="currentColor"
        />
        <path
          d="M18 11C20.7614 11 23 8.76142 23 6C23 3.23858 20.7614 1 18 1C15.2386 1 13 3.23858 13 6C13 8.76142 15.2386 11 18 11Z"
          fill="black"
        />
        <path
          d="M11.5 6C11.5 4.92 11.77 3.9 12.24 3H5C3.9 3 3 3.9 3 5V19C3 19.55 3.23 20.05 3.59 20.41L13.41 10.59C12.23 9.42 11.5 7.8 11.5 6Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
