import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconOfflineBolt } from '@aws-amplify/ui-react';` → `import { MdOfflineBolt } from 'react-icons/md';`
 */
export const IconOfflineBolt = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconOfflineBolt } from '@aws-amplify/ui-react'; → import { MdOfflineBolt } from 'react-icons/md';`,
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
          d="M12 2.02002C6.49 2.02002 2.02 6.49002 2.02 12C2.02 17.51 6.49 21.98 12 21.98C17.51 21.98 21.98 17.51 21.98 12C21.98 6.49002 17.51 2.02002 12 2.02002ZM12 19.98C7.6 19.98 4.02 16.4 4.02 12C4.02 7.60002 7.6 4.02002 12 4.02002C16.4 4.02002 19.98 7.60002 19.98 12C19.98 16.4 16.4 19.98 12 19.98ZM12.75 5.00002L8.25 13.5H11.39V19L15.75 10.5H12.75V5.00002Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
