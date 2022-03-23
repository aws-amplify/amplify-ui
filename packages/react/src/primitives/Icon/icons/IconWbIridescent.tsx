import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWbIridescent } from '@aws-amplify/ui-react';` → `import { MdWbIridescent } from 'react-icons/md';`
 */
export const IconWbIridescent = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWbIridescent } from '@aws-amplify/ui-react'; → import { MdWbIridescent } from 'react-icons/md';`,
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
          d="M5.00005 15H19V9H5.00005V15ZM7.00005 11H17V13H7.00005V11ZM11 1H13V4H11V1ZM20.46 5.01L19.04 3.6L17.25 5.39L18.66 6.8L20.46 5.01ZM11 20H13V23H11V20ZM17.24 18.71L19.03 20.51L20.4501 19.09L18.65 17.3L17.24 18.71ZM4.96005 3.595L6.74805 5.385L5.34005 6.79L3.55305 5.003L4.96005 3.595ZM3.55005 19.08L4.96005 20.5L6.75005 18.7L5.34005 17.29L3.55005 19.08Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
