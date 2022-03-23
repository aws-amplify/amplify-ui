import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRadio } from '@aws-amplify/ui-react';` → `import { MdRadio } from 'react-icons/md';`
 */
export const IconRadio = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRadio } from '@aws-amplify/ui-react'; → import { MdRadio } from 'react-icons/md';`,
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
          d="M20 6H8.3L16.56 2.66L15.88 1L3.24 6.15C2.51 6.43 2 7.17 2 8V20C2 21.1 2.89 22 4 22H20C21.11 22 22 21.1 22 20V8C22 6.89 21.11 6 20 6ZM20 8V11H18V9H16V11H4V8H20ZM4 20V13H20V20H4Z"
          fill="currentColor"
        />
        <path
          d="M8 18.98C9.38071 18.98 10.5 17.8607 10.5 16.48C10.5 15.0993 9.38071 13.98 8 13.98C6.61929 13.98 5.5 15.0993 5.5 16.48C5.5 17.8607 6.61929 18.98 8 18.98Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
