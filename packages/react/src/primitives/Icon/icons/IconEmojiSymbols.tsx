import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEmojiSymbols } from '@aws-amplify/ui-react';` → `import { MdEmojiSymbols } from 'react-icons/md';`
 */
export const IconEmojiSymbols = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconEmojiSymbols } from '@aws-amplify/ui-react'; → import { MdEmojiSymbols } from 'react-icons/md';`,
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
        <path d="M11 2H3V4H11V2Z" fill="currentColor" />
        <path d="M6 11H8V7H11V5H3V7H6V11Z" fill="black" />
        <path
          d="M20.1814 12.4035L12.4033 20.1816L13.8175 21.5958L21.5956 13.8177L20.1814 12.4035Z"
          fill="black"
        />
        <path
          d="M14.5 16C15.3284 16 16 15.3284 16 14.5C16 13.6716 15.3284 13 14.5 13C13.6716 13 13 13.6716 13 14.5C13 15.3284 13.6716 16 14.5 16Z"
          fill="black"
        />
        <path
          d="M19.5 21C20.3284 21 21 20.3284 21 19.5C21 18.6716 20.3284 18 19.5 18C18.6716 18 18 18.6716 18 19.5C18 20.3284 18.6716 21 19.5 21Z"
          fill="black"
        />
        <path
          d="M15.5 11C16.88 11 18 9.88 18 8.5V4H21V2H17V6.51C16.58 6.19 16.07 6 15.5 6C14.12 6 13 7.12 13 8.5C13 9.88 14.12 11 15.5 11Z"
          fill="black"
        />
        <path
          d="M9.73986 15.96L8.32986 17.37L7.61986 16.66L7.96986 16.31C8.94986 15.33 8.94986 13.75 7.96986 12.77C7.47986 12.28 6.83986 12.04 6.19986 12.04C5.55986 12.04 4.91986 12.28 4.42986 12.77C3.44986 13.75 3.44986 15.33 4.42986 16.31L4.77986 16.66L3.71986 17.72C2.73986 18.7 2.73986 20.28 3.71986 21.26C4.21986 21.76 4.85986 22 5.49986 22C6.13986 22 6.77986 21.76 7.26986 21.27L8.32986 20.21L9.73986 21.62L11.1499 20.21L9.73986 18.8L11.1499 17.39L9.73986 15.96ZM5.84986 14.2C5.96986 14.08 6.10986 14.05 6.19986 14.05C6.28986 14.05 6.42986 14.08 6.54986 14.2C6.73986 14.4 6.73986 14.71 6.54986 14.91L6.19986 15.26L5.84986 14.9C5.65986 14.71 5.65986 14.39 5.84986 14.2ZM5.84986 19.85C5.72986 19.97 5.58986 20 5.49986 20C5.40986 20 5.26986 19.97 5.14986 19.85C4.95986 19.66 4.95986 19.34 5.14986 19.14L6.20986 18.08L6.91986 18.79L5.84986 19.85Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
