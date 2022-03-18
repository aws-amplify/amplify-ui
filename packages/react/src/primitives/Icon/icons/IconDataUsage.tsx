import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDataUsage } from '@aws-amplify/ui-react';` → `import { MdDataUsage } from 'react-icons/md';`
 */
export const IconDataUsage = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDataUsage } from '@aws-amplify/ui-react'; → import { MdDataUsage } from 'react-icons/md';`,
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
          d="M13 2.0498V5.0798C16.39 5.5698 19 8.4698 19 11.9998C19 12.8998 18.82 13.7498 18.52 14.5398L21.12 16.0698C21.68 14.8298 22 13.4498 22 11.9998C22 6.8198 18.05 2.5498 13 2.0498V2.0498ZM12 18.9998C8.13 18.9998 5 15.8698 5 11.9998C5 8.4698 7.61 5.5698 11 5.0798V2.0498C5.94 2.5498 2 6.8098 2 11.9998C2 17.5198 6.47 21.9998 11.99 21.9998C15.3 21.9998 18.23 20.3898 20.05 17.9098L17.45 16.3798C16.17 17.9798 14.21 18.9998 12 18.9998Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
