import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCallMissedOutgoing } from '@aws-amplify/ui-react';` → `import { MdCallMissedOutgoing } from 'react-icons/md';`
 */
export const IconCallMissedOutgoing = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCallMissedOutgoing } from '@aws-amplify/ui-react'; → import { MdCallMissedOutgoing } from 'react-icons/md';`,
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
          d="M3 8.41L12 17.41L19 10.41V15H21V7H13V9H17.59L12 14.59L4.41 7L3 8.41Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
