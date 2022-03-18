import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSortByAlpha } from '@aws-amplify/ui-react';` → `import { MdSortByAlpha } from 'react-icons/md';`
 */
export const IconSortByAlpha = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSortByAlpha } from '@aws-amplify/ui-react'; → import { MdSortByAlpha } from 'react-icons/md';`,
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
          d="M14.94 4.6598H10.22L12.58 2.2998L14.94 4.6598V4.6598ZM10.25 19.3698H14.91L12.58 21.6998L10.25 19.3698V19.3698ZM6.09998 6.2698L1.59998 17.7298H3.43998L4.35998 15.2798H9.46998L10.39 17.7298H12.23L7.73998 6.2698H6.09998ZM4.96998 13.6398L6.90998 8.4598L8.84998 13.6398H4.96998ZM15.73 16.1398H21.85V17.7298H13.32V16.4398L19.24 7.8798H13.36V6.2798H21.66V7.5398L15.73 16.1398V16.1398Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
