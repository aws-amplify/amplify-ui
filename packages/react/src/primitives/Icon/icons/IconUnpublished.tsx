import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconUnpublished } from '@aws-amplify/ui-react';` → `import { MdUnpublished } from 'react-icons/md';`
 */
export const IconUnpublished = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconUnpublished } from '@aws-amplify/ui-react'; → import { MdUnpublished } from 'react-icons/md';`,
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
          d="M7.94 5.12L6.49 3.66C8.07 2.61 9.96 2 12 2C17.52 2 22 6.48 22 12C22 14.04 21.39 15.93 20.34 17.51L18.88 16.05C19.59 14.86 20 13.48 20 12C20 7.59 16.41 4 12 4C10.52 4 9.14 4.41 7.94 5.12ZM17.66 9.53L16.25 8.12L13.6 10.77L15.01 12.18L17.66 9.53ZM19.78 22.61L17.51 20.34C15.93 21.39 14.04 22 12 22C6.48 22 2 17.52 2 12C2 9.96 2.61 8.07 3.66 6.49L1.39 4.22L2.8 2.81L21.18 21.19L19.78 22.61ZM16.06 18.88L12.18 15L10.59 16.59L6.35 12.35L7.76 10.94L10.59 13.77L10.77 13.59L5.12 7.94C4.41 9.14 4 10.52 4 12C4 16.41 7.59 20 12 20C13.48 20 14.86 19.59 16.06 18.88Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
