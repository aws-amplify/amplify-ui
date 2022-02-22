import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEmojiNature } from '@aws-amplify/ui-react';` → `import { MdEmojiNature } from 'react-icons/md';`
 */
export const IconEmojiNature = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconEmojiNature } from '@aws-amplify/ui-react'; → import { MdEmojiNature } from 'react-icons/md';`,
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
          d="M21.94 4.88C21.76 4.35 21.25 4 20.68 4C20.65 4 20.62 4 20.59 4H19.6L19.29 3.03C19.15 2.43 18.61 2 18 2C17.39 2 16.85 2.43 16.71 3.04L16.4 4H15.42C15.39 4 15.36 4 15.33 4C14.76 4 14.25 4.35 14.07 4.88C13.88 5.44 14.11 6.05 14.63 6.36L15.5 6.88L15.1 8.12C14.87 8.7 15.06 9.37 15.55 9.74C15.78 9.91 16.06 10 16.33 10C16.64 10 16.94 9.89 17.19 9.68L18 8.98L18.81 9.68C19.06 9.89 19.36 10 19.67 10C19.94 10 20.22 9.91 20.45 9.74C20.95 9.37 21.13 8.7 20.9 8.12L20.51 6.88L21.38 6.36C21.89 6.05 22.12 5.44 21.94 4.88ZM18 7C17.45 7 17 6.55 17 6C17 5.45 17.45 5 18 5C18.55 5 19 5.45 19 6C19 6.55 18.55 7 18 7Z"
          fill="currentColor"
        />
        <path
          d="M13.49 10.51C13.06 10.08 12.55 9.78 12 9.58V8H11V9.38C10.89 9.37 10.77 9.35 10.66 9.35C9.64002 9.35 8.61002 9.74 7.83002 10.52C7.71002 10.64 7.53002 10.82 7.33002 11.02L6.00002 10.52C4.44002 9.97 2.72002 10.79 2.17002 12.34C1.90002 13.09 1.94002 13.91 2.29002 14.63C2.52002 15.11 2.87002 15.5 3.29002 15.79C2.91002 17.14 3.23002 18.64 4.29002 19.7C5.07002 20.48 6.09002 20.87 7.12002 20.87C7.49002 20.87 7.85002 20.8 8.21002 20.7C8.50002 21.12 8.89002 21.47 9.37002 21.7C9.78002 21.9 10.21 22 10.65 22C10.99 22 11.33 21.94 11.66 21.83C13.22 21.28 14.04 19.56 13.48 17.98L12.99 16.68C13.19 16.48 13.37 16.3 13.49 16.18C14.36 15.31 14.73 14.14 14.63 13.01H16V12.01H14.41C14.22 11.46 13.92 10.95 13.49 10.51ZM7.58002 18.82C7.43002 18.86 7.28002 18.88 7.12002 18.88C6.59002 18.88 6.08002 18.67 5.71002 18.29C5.33002 17.91 5.12002 17.41 5.12002 16.88C5.12002 16.72 5.15002 16.56 5.18002 16.41C5.32002 16.42 5.46002 16.44 5.60002 16.44C6.45002 16.44 7.28002 16.24 8.04002 15.96C7.72002 16.85 7.50002 17.83 7.58002 18.82ZM4.67002 14.29C4.42002 14.2 4.22002 14.02 4.10002 13.78C3.98002 13.54 3.97002 13.27 4.06002 13.02C4.25002 12.5 4.82002 12.23 5.32002 12.41L8.48002 13.6C7.33002 14.2 5.85002 14.71 4.67002 14.29ZM10.99 19.94C10.74 20.03 10.47 20.02 10.23 19.9C9.99002 19.79 9.81002 19.58 9.72002 19.33C9.30002 18.15 9.81002 16.68 10.42 15.53L11.6 18.66C11.78 19.18 11.51 19.76 10.99 19.94ZM12.2 14.6L11.59 12.99C11.59 12.98 11.58 12.97 11.57 12.96C11.55 12.92 11.53 12.88 11.51 12.84C11.49 12.8 11.47 12.77 11.44 12.73C11.41 12.7 11.38 12.67 11.35 12.64C11.32 12.61 11.29 12.58 11.26 12.55C11.23 12.52 11.19 12.5 11.15 12.48C11.11 12.46 11.08 12.43 11.03 12.42C11.02 12.42 11.01 12.41 11 12.4L9.40002 11.8C9.76002 11.51 10.19 11.34 10.66 11.34C11.19 11.34 11.7 11.55 12.07 11.93C12.8 12.66 12.84 13.81 12.2 14.6Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
