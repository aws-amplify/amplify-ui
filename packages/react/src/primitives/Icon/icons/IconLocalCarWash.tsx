import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLocalCarWash } from '@aws-amplify/ui-react';` → `import { MdLocalCarWash } from 'react-icons/md';`
 */
export const IconLocalCarWash = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLocalCarWash } from '@aws-amplify/ui-react'; → import { MdLocalCarWash } from 'react-icons/md';`,
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
          d="M17 4.9998C17.83 4.9998 18.5 4.3298 18.5 3.4998C18.5 2.4998 17 0.799805 17 0.799805C17 0.799805 15.5 2.4998 15.5 3.4998C15.5 4.3298 16.17 4.9998 17 4.9998ZM12 4.9998C12.83 4.9998 13.5 4.3298 13.5 3.4998C13.5 2.4998 12 0.799805 12 0.799805C12 0.799805 10.5 2.4998 10.5 3.4998C10.5 4.3298 11.17 4.9998 12 4.9998ZM7 4.9998C7.83 4.9998 8.5 4.3298 8.5 3.4998C8.5 2.4998 7 0.799805 7 0.799805C7 0.799805 5.5 2.4998 5.5 3.4998C5.5 4.3298 6.17 4.9998 7 4.9998ZM18.92 8.0098C18.72 7.4198 18.16 6.9998 17.5 6.9998H6.5C5.84 6.9998 5.29 7.4198 5.08 8.0098L3 13.9998V21.9998C3 22.5498 3.45 22.9998 4 22.9998H5C5.55 22.9998 6 22.5498 6 21.9998V20.9998H18V21.9998C18 22.5498 18.45 22.9998 19 22.9998H20C20.55 22.9998 21 22.5498 21 21.9998V13.9998L18.92 8.0098ZM6.85 8.9998H17.14L18.18 11.9998H5.81L6.85 8.9998ZM19 18.9998H5V14.3398L5.12 13.9998H18.89L19 14.3398V18.9998Z"
          fill="currentColor"
        />
        <path
          d="M7.5 18C8.32843 18 9 17.3284 9 16.5C9 15.6716 8.32843 15 7.5 15C6.67157 15 6 15.6716 6 16.5C6 17.3284 6.67157 18 7.5 18Z"
          fill="black"
        />
        <path
          d="M16.5 18C17.3284 18 18 17.3284 18 16.5C18 15.6716 17.3284 15 16.5 15C15.6716 15 15 15.6716 15 16.5C15 17.3284 15.6716 18 16.5 18Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
