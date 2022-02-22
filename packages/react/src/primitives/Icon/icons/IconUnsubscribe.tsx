import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconUnsubscribe } from '@aws-amplify/ui-react';` → `import { MdUnsubscribe } from 'react-icons/md';`
 */
export const IconUnsubscribe = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconUnsubscribe } from '@aws-amplify/ui-react'; → import { MdUnsubscribe } from 'react-icons/md';`,
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
          d="M20.99 14.04V5C20.99 3.9 20.09 3 18.99 3H5C3.9 3 3 3.9 3 5V15C3 16.1 3.9 17 5 17H15.05C15.33 18.92 17.15 20.35 19.23 19.93C20.57 19.66 21.66 18.56 21.93 17.22C22.18 15.98 21.77 14.83 20.99 14.04ZM18.99 5L12 8.5L5 5H18.99V5ZM15.35 15H5V7L12 10.5L19 7V13.05C18.84 13.03 18.67 13 18.5 13C17.11 13 15.91 13.82 15.35 15V15ZM20.5 17H16.5V16H20.5V17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
