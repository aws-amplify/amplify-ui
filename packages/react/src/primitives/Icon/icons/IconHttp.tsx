import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHttp } from '@aws-amplify/ui-react';` → `import { MdHttp } from 'react-icons/md';`
 */
export const IconHttp = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHttp } from '@aws-amplify/ui-react'; → import { MdHttp } from 'react-icons/md';`,
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
          d="M4.5 11H2.5V9H1V15H2.5V12.5H4.5V15H6V9H4.5V11ZM7 10.5H8.5V15H10V10.5H11.5V9H7V10.5ZM12.5 10.5H14V15H15.5V10.5H17V9H12.5V10.5ZM21.5 9H18V15H19.5V13H21.5C22.3 13 23 12.3 23 11.5V10.5C23 9.7 22.3 9 21.5 9ZM21.5 11.5H19.5V10.5H21.5V11.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
