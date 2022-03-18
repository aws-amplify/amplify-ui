import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEditAttributes } from '@aws-amplify/ui-react';` → `import { MdEditAttributes } from 'react-icons/md';`
 */
export const IconEditAttributes = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconEditAttributes } from '@aws-amplify/ui-react'; → import { MdEditAttributes } from 'react-icons/md';`,
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
          d="M17.63 7H6.37C3.96 7 2 9.24 2 12C2 14.76 3.96 17 6.37 17H17.63C20.04 17 22 14.76 22 12C22 9.24 20.04 7 17.63 7ZM17.63 15H6.37C5.09 15 4 13.63 4 12C4 10.37 5.09 9 6.37 9H17.63C18.91 9 20 10.37 20 12C20 13.63 18.91 15 17.63 15ZM7.24 13.06L5.37 11.19L4.67 11.89L7.24 14.46L11.46 10.24L10.76 9.54L7.24 13.06Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
