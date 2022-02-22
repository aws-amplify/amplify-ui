import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCropRotate } from '@aws-amplify/ui-react';` → `import { MdCropRotate } from 'react-icons/md';`
 */
export const IconCropRotate = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCropRotate } from '@aws-amplify/ui-react'; → import { MdCropRotate } from 'react-icons/md';`,
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
          d="M7.47 21.49C4.2 19.93 1.86 16.76 1.5 13H0C0.51 19.16 5.66 24 11.95 24C12.18 24 12.39 23.98 12.61 23.97L8.8 20.15L7.47 21.49V21.49ZM12.05 0C11.82 0 11.61 0.02 11.39 0.04L15.2 3.85L16.53 2.52C19.8 4.07 22.14 7.24 22.5 11H24C23.49 4.84 18.34 0 12.05 0ZM16 14H18V8C18 6.89 17.1 6 16 6H10V8H16V14ZM8 16V4H6V6H4V8H6V16C6 17.1 6.89 18 8 18H16V20H18V18H20V16H8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
