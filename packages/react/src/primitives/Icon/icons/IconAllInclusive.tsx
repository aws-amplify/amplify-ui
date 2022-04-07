import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAllInclusive } from '@aws-amplify/ui-react';` → `import { MdAllInclusive } from 'react-icons/md';`
 */
export const IconAllInclusive = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAllInclusive } from '@aws-amplify/ui-react'; → import { MdAllInclusive } from 'react-icons/md';`,
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
          d="M18.6 6.62012C17.16 6.62012 15.8 7.18012 14.83 8.15012L7.8 14.3901C7.16 15.0301 6.31 15.3801 5.4 15.3801C3.53 15.3801 2.01 13.8701 2.01 12.0001C2.01 10.1301 3.53 8.62012 5.4 8.62012C6.31 8.62012 7.16 8.97012 7.84 9.65012L8.97 10.6501L10.48 9.31012L9.22 8.20012C8.2 7.18012 6.84 6.62012 5.4 6.62012C2.42 6.62012 0 9.04012 0 12.0001C0 14.9601 2.42 17.3801 5.4 17.3801C6.84 17.3801 8.2 16.8201 9.17 15.8501L16.2 9.61012C16.84 8.97012 17.69 8.62012 18.6 8.62012C20.47 8.62012 21.99 10.1301 21.99 12.0001C21.99 13.8701 20.47 15.3801 18.6 15.3801C17.7 15.3801 16.84 15.0301 16.16 14.3501L15.02 13.3401L13.51 14.6801L14.78 15.8001C15.8 16.8101 17.15 17.3701 18.6 17.3701C21.58 17.3701 24 14.9601 24 11.9901C24 9.02012 21.58 6.62012 18.6 6.62012V6.62012Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
