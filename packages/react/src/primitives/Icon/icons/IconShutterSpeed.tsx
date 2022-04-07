import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconShutterSpeed } from '@aws-amplify/ui-react';` → `import { MdShutterSpeed } from 'react-icons/md';`
 */
export const IconShutterSpeed = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconShutterSpeed } from '@aws-amplify/ui-react'; → import { MdShutterSpeed } from 'react-icons/md';`,
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
          d="M15 1H9V3H15V1ZM19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13C3 17.97 7.02 22 12 22C16.98 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM12 20C8.13 20 5 16.87 5 13C5 9.13 8.13 6 12 6C15.87 6 19 9.13 19 13C19 16.87 15.87 20 12 20ZM11.68 15H6.35C6.92 16.62 8.17 17.92 9.76 18.56L9.65 18.5L11.68 15ZM17.65 11C17.08 9.4 15.87 8.11 14.31 7.46L12.26 11H17.65ZM10.61 18.83C11.06 18.94 11.52 19 12 19C13.34 19 14.57 18.55 15.57 17.81L13.46 13.91L10.61 18.83V18.83ZM7.55 8.99C6.59 10.05 6 11.46 6 13C6 13.34 6.04 13.67 6.09 14H10.81L7.55 8.99ZM16.34 17.13C17.37 16.06 18 14.6 18 13C18 12.66 17.96 12.33 17.91 12H13.57L16.34 17.13V17.13ZM13.33 7.15C12.9 7.06 12.46 7 12 7C10.6 7 9.31 7.49 8.29 8.29L10.61 11.85L13.33 7.15V7.15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
