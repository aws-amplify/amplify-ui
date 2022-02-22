import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPanoramaHorizontal } from '@aws-amplify/ui-react';` → `import { MdPanoramaHorizontal } from 'react-icons/md';`
 */
export const IconPanoramaHorizontal = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPanoramaHorizontal } from '@aws-amplify/ui-react'; → import { MdPanoramaHorizontal } from 'react-icons/md';`,
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
          d="M20 6.54V17.45C17.4 16.68 14.72 16.29 12 16.29C9.28 16.29 6.6 16.68 4 17.45V6.54C6.6 7.31 9.28 7.7 12 7.7C14.72 7.71 17.4 7.32 20 6.54ZM21.43 4C21.33 4 21.23 4.02 21.12 4.06C18.18 5.16 15.09 5.7 12 5.7C8.91 5.7 5.82 5.15 2.88 4.06C2.77 4.02 2.66 4 2.57 4C2.23 4 2 4.23 2 4.63V19.38C2 19.77 2.23 20 2.57 20C2.67 20 2.77 19.98 2.88 19.94C5.82 18.84 8.91 18.3 12 18.3C15.09 18.3 18.18 18.85 21.12 19.94C21.23 19.98 21.33 20 21.43 20C21.76 20 22 19.77 22 19.37V4.63C22 4.23 21.76 4 21.43 4V4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
