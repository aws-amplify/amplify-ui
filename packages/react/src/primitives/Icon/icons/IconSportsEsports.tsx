import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSportsEsports } from '@aws-amplify/ui-react';` → `import { MdSportsEsports } from 'react-icons/md';`
 */
export const IconSportsEsports = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSportsEsports } from '@aws-amplify/ui-react'; → import { MdSportsEsports } from 'react-icons/md';`,
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
          d="M21.5798 16.09L20.4898 8.43C20.2098 6.46 18.5198 5 16.5298 5H7.46982C5.47982 5 3.78982 6.46 3.50982 8.43L2.41982 16.09C2.19982 17.63 3.38982 19 4.93982 19C5.61982 19 6.25982 18.73 6.73982 18.25L8.99982 16H14.9998L17.2498 18.25C17.7298 18.73 18.3798 19 19.0498 19C20.6098 19 21.7998 17.63 21.5798 16.09ZM19.4798 16.81C19.3998 16.9 19.2698 17 19.0598 17C18.9098 17 18.7698 16.94 18.6698 16.84L15.8298 14H8.16982L5.32982 16.84C5.22982 16.94 5.08982 17 4.93982 17C4.72982 17 4.59982 16.9 4.51982 16.81C4.43982 16.72 4.35982 16.58 4.38982 16.37L5.47982 8.71C5.62982 7.74 6.47982 7 7.46982 7H16.5298C17.5198 7 18.3698 7.74 18.5098 8.72L19.5998 16.38C19.6298 16.58 19.5498 16.72 19.4798 16.81Z"
          fill="currentColor"
        />
        <path d="M9 8H8V10H6V11H8V13H9V11H11V10H9V8Z" fill="black" />
        <path
          d="M17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11C16.4477 11 16 11.4477 16 12C16 12.5523 16.4477 13 17 13Z"
          fill="black"
        />
        <path
          d="M15 10C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9C14 9.55228 14.4477 10 15 10Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
