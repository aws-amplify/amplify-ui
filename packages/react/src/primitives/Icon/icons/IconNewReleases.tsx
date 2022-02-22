import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNewReleases } from '@aws-amplify/ui-react';` → `import { MdNewReleases } from 'react-icons/md';`
 */
export const IconNewReleases = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNewReleases } from '@aws-amplify/ui-react'; → import { MdNewReleases } from 'react-icons/md';`,
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
          d="M23 12L20.56 9.22004L20.9 5.54004L17.29 4.72004L15.4 1.54004L12 3.00004L8.6 1.54004L6.71 4.72004L3.1 5.53004L3.44 9.21004L1 12L3.44 14.78L3.1 18.47L6.71 19.29L8.6 22.47L12 21L15.4 22.46L17.29 19.28L20.9 18.46L20.56 14.78L23 12ZM18.49 14.11L18.75 16.9L16.01 17.52L14.58 19.93L12 18.82L9.42 19.93L7.99 17.52L5.25 16.9L5.51 14.1L3.66 12L5.51 9.88004L5.25 7.10004L7.99 6.49004L9.42 4.08004L12 5.18004L14.58 4.07004L16.01 6.48004L18.75 7.10004L18.49 9.89004L20.34 12L18.49 14.11V14.11ZM11 15H13V17H11V15ZM11 7.00004H13V13H11V7.00004Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
