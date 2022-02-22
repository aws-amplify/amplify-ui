import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNearMe } from '@aws-amplify/ui-react';` → `import { MdNearMe } from 'react-icons/md';`
 */
export const IconNearMe = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNearMe } from '@aws-amplify/ui-react'; → import { MdNearMe } from 'react-icons/md';`,
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
          d="M17.27 6.73L13.03 16.86L11.71 13.44L11.39 12.61L10.57 12.29L7.14 10.96L17.27 6.73V6.73ZM21 3L3 10.53V11.51L9.84 14.16L12.48 21H13.46L21 3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
