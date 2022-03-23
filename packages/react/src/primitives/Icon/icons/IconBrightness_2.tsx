import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBrightness_2 } from '@aws-amplify/ui-react';` → `import { MdBrightness_2 } from 'react-icons/md';`
 */
export const IconBrightness_2 = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBrightness_2 } from '@aws-amplify/ui-react'; → import { MdBrightness_2 } from 'react-icons/md';`,
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
          d="M10 4C14.41 4 18 7.59 18 12C18 16.41 14.41 20 10 20C9.66 20 9.32 19.98 8.99 19.93C10.9 17.77 12 14.95 12 12C12 9.05 10.9 6.23 8.99 4.07C9.32 4.02 9.66 4 10 4ZM10 2C8.18 2 6.47 2.5 5 3.35C7.99 5.08 10 8.3 10 12C10 15.7 7.99 18.92 5 20.65C6.47 21.5 8.18 22 10 22C15.52 22 20 17.52 20 12C20 6.48 15.52 2 10 2Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
