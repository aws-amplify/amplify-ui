import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMovieFilter } from '@aws-amplify/ui-react';` → `import { MdMovieFilter } from 'react-icons/md';`
 */
export const IconMovieFilter = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMovieFilter } from '@aws-amplify/ui-react'; → import { MdMovieFilter } from 'react-icons/md';`,
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
          d="M10 11L9.06001 13.06L7.00001 14L9.06001 14.94L10 17L10.94 14.94L13 14L10.94 13.06L10 11ZM18.01 4L20.01 8H17.01L15.01 4H13.01L15.01 8H12.01L10.01 4H8.01001L10.01 8H7.01001L5.01001 4H4.01001C2.91001 4 2.02001 4.9 2.02001 6L2.01001 18C2.01001 19.1 2.91001 20 4.01001 20H20.01C21.11 20 22 19.1 22 18V4H18.01ZM20.01 18H4.01001V6.47L5.77001 10H16L15.37 11.37L14 12L15.37 12.63L16 14L16.63 12.63L18 12L16.63 11.37L16 10H20.01V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
