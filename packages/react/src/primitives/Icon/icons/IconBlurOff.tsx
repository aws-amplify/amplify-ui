import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBlurOff } from '@aws-amplify/ui-react';` → `import { MdBlurOff } from 'react-icons/md';`
 */
export const IconBlurOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBlurOff } from '@aws-amplify/ui-react'; → import { MdBlurOff } from 'react-icons/md';`,
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
          d="M14 7C14.5523 7 15 6.55228 15 6C15 5.44772 14.5523 5 14 5C13.4477 5 13 5.44772 13 6C13 6.55228 13.4477 7 14 7Z"
          fill="currentColor"
        />
        <path
          d="M13.8 11.48L14 11.5C14.83 11.5 15.5 10.83 15.5 10C15.5 9.17 14.83 8.5 14 8.5C13.17 8.5 12.5 9.17 12.5 10L12.52 10.2C12.61 10.87 13.13 11.39 13.8 11.48V11.48ZM14 3.5C14.28 3.5 14.5 3.28 14.5 3C14.5 2.72 14.28 2.5 14 2.5C13.72 2.5 13.5 2.72 13.5 3C13.5 3.28 13.72 3.5 14 3.5ZM10 3.5C10.28 3.5 10.5 3.28 10.5 3C10.5 2.72 10.28 2.5 10 2.5C9.72 2.5 9.5 2.72 9.5 3C9.5 3.28 9.72 3.5 10 3.5Z"
          fill="black"
        />
        <path
          d="M18 11C18.5523 11 19 10.5523 19 10C19 9.44772 18.5523 9 18 9C17.4477 9 17 9.44772 17 10C17 10.5523 17.4477 11 18 11Z"
          fill="black"
        />
        <path
          d="M18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7Z"
          fill="black"
        />
        <path
          d="M21 10.5C21.28 10.5 21.5 10.28 21.5 10C21.5 9.72 21.28 9.5 21 9.5C20.72 9.5 20.5 9.72 20.5 10C20.5 10.28 20.72 10.5 21 10.5Z"
          fill="black"
        />
        <path
          d="M10 7C10.5523 7 11 6.55228 11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6C9 6.55228 9.44772 7 10 7Z"
          fill="black"
        />
        <path
          d="M18 15C18.5523 15 19 14.5523 19 14C19 13.4477 18.5523 13 18 13C17.4477 13 17 13.4477 17 14C17 14.5523 17.4477 15 18 15Z"
          fill="black"
        />
        <path
          d="M6 19C6.55228 19 7 18.5523 7 18C7 17.4477 6.55228 17 6 17C5.44772 17 5 17.4477 5 18C5 18.5523 5.44772 19 6 19Z"
          fill="black"
        />
        <path
          d="M14 20.5C13.72 20.5 13.5 20.72 13.5 21C13.5 21.28 13.72 21.5 14 21.5C14.28 21.5 14.5 21.28 14.5 21C14.5 20.72 14.28 20.5 14 20.5ZM21 13.5C20.72 13.5 20.5 13.72 20.5 14C20.5 14.28 20.72 14.5 21 14.5C21.28 14.5 21.5 14.28 21.5 14C21.5 13.72 21.28 13.5 21 13.5ZM3 13.5C2.72 13.5 2.5 13.72 2.5 14C2.5 14.28 2.72 14.5 3 14.5C3.28 14.5 3.5 14.28 3.5 14C3.5 13.72 3.28 13.5 3 13.5Z"
          fill="black"
        />
        <path
          d="M10 19C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17C9.44772 17 9 17.4477 9 18C9 18.5523 9.44772 19 10 19Z"
          fill="black"
        />
        <path
          d="M3 9.5C2.72 9.5 2.5 9.72 2.5 10C2.5 10.28 2.72 10.5 3 10.5C3.28 10.5 3.5 10.28 3.5 10C3.5 9.72 3.28 9.5 3 9.5ZM10 20.5C9.72 20.5 9.5 20.72 9.5 21C9.5 21.28 9.72 21.5 10 21.5C10.28 21.5 10.5 21.28 10.5 21C10.5 20.72 10.28 20.5 10 20.5Z"
          fill="black"
        />
        <path
          d="M6 15C6.55228 15 7 14.5523 7 14C7 13.4477 6.55228 13 6 13C5.44772 13 5 13.4477 5 14C5 14.5523 5.44772 15 6 15Z"
          fill="black"
        />
        <path
          d="M2.5 5.27011L6 8.77011L6.28 9.05011L6 9.00011C5.45 9.00011 5 9.45011 5 10.0001C5 10.5501 5.45 11.0001 6 11.0001C6.55 11.0001 7 10.5501 7 10.0001C7 9.90011 6.97 9.81011 6.94 9.72011L9.75 12.5301C9.04 12.6401 8.5 13.2601 8.5 14.0001C8.5 14.8301 9.17 15.5001 10 15.5001C10.74 15.5001 11.36 14.9601 11.47 14.2501L14.28 17.0601C14.19 17.0301 14.1 17.0001 14 17.0001C13.45 17.0001 13 17.4501 13 18.0001C13 18.5501 13.45 19.0001 14 19.0001C14.55 19.0001 15 18.5501 15 18.0001C15 17.9001 14.97 17.8101 14.94 17.7201L18.72 21.5001H18.73L20.14 20.0901L3.91 3.86011L2.5 5.27011Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
