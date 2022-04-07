import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSportsVolleyball } from '@aws-amplify/ui-react';` → `import { MdSportsVolleyball } from 'react-icons/md';`
 */
export const IconSportsVolleyball = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSportsVolleyball } from '@aws-amplify/ui-react'; → import { MdSportsVolleyball } from 'react-icons/md';`,
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
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 4.07C16.07 4.45 18.57 6.59 19.54 9.43L13 5.65V4.07ZM8 5.08C9.18 4.39 11.33 4.02 11 4.06V11.41L8 13.14V5.08ZM4.63 15.1C4.23 14.14 4 13.1 4 12C4 9.98 4.76 8.14 6 6.73V14.31L4.63 15.1ZM5.64 16.83L12 13.15L15 14.88L8.02 18.91C7.09 18.38 6.28 17.68 5.64 16.83ZM12 20C11.46 20 10.93 19.94 10.42 19.84L17 16.04L18.36 16.82C16.9 18.75 14.6 20 12 20ZM13 11.42V7.96L20 12.01C20 13.11 19.77 14.15 19.37 15.1L13 11.42Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
