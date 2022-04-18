import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRoofing } from '@aws-amplify/ui-react';` → `import { MdRoofing } from 'react-icons/md';`
 */
export const IconRoofing = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRoofing } from '@aws-amplify/ui-react'; → import { MdRoofing } from 'react-icons/md';`,
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
          d="M13 18H11V16H13V18ZM15 14H9V20H15V14ZM19 9.3V4H16V6.6L12 3L2 12H5L12 5.69L19 12H22L19 9.3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
