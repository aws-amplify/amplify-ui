import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBento } from '@aws-amplify/ui-react';` → `import { MdBento } from 'react-icons/md';`
 */
export const IconBento = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBento } from '@aws-amplify/ui-react'; → import { MdBento } from 'react-icons/md';`,
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
          d="M20 5H4C2.9 5 2 5.9 2 7V17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17V7C22 5.9 21.1 5 20 5ZM20 11H14V7H20V11ZM4 7H12V17H4V7ZM14 17V13H20V17H14ZM9.5 12C9.5 12.83 8.83 13.5 8 13.5C7.17 13.5 6.5 12.83 6.5 12C6.5 11.17 7.17 10.5 8 10.5C8.83 10.5 9.5 11.17 9.5 12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
