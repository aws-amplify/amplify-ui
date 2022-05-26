import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconContactless } from '@aws-amplify/ui-react';` → `import { MdContactless } from 'react-icons/md';`
 */
export const IconContactless = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconContactless } from '@aws-amplify/ui-react'; → import { MdContactless } from 'react-icons/md';`,
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
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
          fill="currentColor"
        />
        <path
          d="M7.10001 10.1801C7.36001 10.7401 7.49001 11.3401 7.50001 11.9801C7.51001 12.6101 7.37001 13.2301 7.10001 13.8401L8.47001 14.4601C8.84001 13.6501 9.02001 12.8101 9.01001 11.9601C9.00001 11.1201 8.82001 10.3101 8.47001 9.56006L7.10001 10.1801Z"
          fill="black"
        />
        <path
          d="M13.33 7.33016C14.11 8.90016 14.51 10.4702 14.51 11.9702C14.51 13.4802 14.11 15.0602 13.33 16.6602L14.68 17.3202C15.56 15.5102 16.01 13.7102 16.01 11.9702C16.01 10.2302 15.56 8.44016 14.68 6.66016L13.33 7.33016Z"
          fill="black"
        />
        <path
          d="M10.2 8.7198C10.73 9.7898 11 10.9298 11 12.1198C11 13.2898 10.74 14.3498 10.22 15.2698L11.52 16.0098C12.17 14.8598 12.5 13.5598 12.5 12.1198C12.5 10.6998 12.18 9.3298 11.54 8.0498L10.2 8.7198Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
