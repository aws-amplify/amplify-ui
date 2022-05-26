import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRvHookup } from '@aws-amplify/ui-react';` → `import { MdRvHookup } from 'react-icons/md';`
 */
export const IconRvHookup = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRvHookup } from '@aws-amplify/ui-react'; → import { MdRvHookup } from 'react-icons/md';`,
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
          d="M20 17V11C20 9.9 19.1 9 18 9H7V7L4 10L7 13V11H11V14H4V17C4 18.1 4.9 19 6 19H8C8 20.66 9.34 22 11 22C12.66 22 14 20.66 14 19H22V17H20ZM11 20C10.45 20 10 19.55 10 19C10 18.45 10.45 18 11 18C11.55 18 12 18.45 12 19C12 19.55 11.55 20 11 20ZM18 14H14V11H18V14ZM17 2V4H9V6H17V8L20 5L17 2Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
