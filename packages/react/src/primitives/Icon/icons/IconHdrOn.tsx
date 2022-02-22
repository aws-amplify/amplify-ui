import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHdrOn } from '@aws-amplify/ui-react';` → `import { MdHdrOn } from 'react-icons/md';`
 */
export const IconHdrOn = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHdrOn } from '@aws-amplify/ui-react'; → import { MdHdrOn } from 'react-icons/md';`,
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
          d="M21 11.5V10.5C21 9.7 20.3 9 19.5 9H16V15H17.5V13H18.6L19.5 15H21L20.1 12.9C20.6 12.6 21 12.1 21 11.5ZM19.5 11.5H17.5V10.5H19.5V11.5ZM6.5 11H4.5V9H3V15H4.5V12.5H6.5V15H8V9H6.5V11ZM13 9H9.5V15H13C13.8 15 14.5 14.3 14.5 13.5V10.5C14.5 9.7 13.8 9 13 9ZM13 13.5H11V10.5H13V13.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
