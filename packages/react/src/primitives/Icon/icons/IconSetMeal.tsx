import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSetMeal } from '@aws-amplify/ui-react';` → `import { MdSetMeal } from 'react-icons/md';`
 */
export const IconSetMeal = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSetMeal } from '@aws-amplify/ui-react'; → import { MdSetMeal } from 'react-icons/md';`,
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
          d="M21.05 17.56L3.08 18.5L3 17L20.98 16.06L21.05 17.56ZM21 19.48H3V20.98H21V19.48ZM23 13V4C23 2.9 22.1 2 21 2H3C1.9 2 1 2.9 1 4V13C1 14.1 1.9 15 3 15H21C22.1 15 23 14.1 23 13ZM21 13H3V4H21V13ZM20 6C18.32 6 16.96 6.98 16.79 8.23C16.15 7.5 14.06 5.5 10.25 5.5C5.58 5.5 3.5 8.5 3.5 8.5C3.5 8.5 5.58 11.5 10.25 11.5C14.06 11.5 16.15 9.5 16.79 8.77C16.96 10.02 18.32 11 20 11V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
