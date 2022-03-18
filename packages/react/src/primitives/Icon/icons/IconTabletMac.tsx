import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTabletMac } from '@aws-amplify/ui-react';` → `import { MdTabletMac } from 'react-icons/md';`
 */
export const IconTabletMac = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTabletMac } from '@aws-amplify/ui-react'; → import { MdTabletMac } from 'react-icons/md';`,
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
          d="M18.5 0H4.5C3.12 0 2 1.12 2 2.5V21.5C2 22.88 3.12 24 4.5 24H18.5C19.88 24 21 22.88 21 21.5V2.5C21 1.12 19.88 0 18.5 0ZM11.5 23C10.67 23 10 22.33 10 21.5C10 20.67 10.67 20 11.5 20C12.33 20 13 20.67 13 21.5C13 22.33 12.33 23 11.5 23ZM19 19H4V3H19V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
