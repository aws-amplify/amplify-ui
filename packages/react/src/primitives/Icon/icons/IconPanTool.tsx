import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPanTool } from '@aws-amplify/ui-react';` → `import { MdPanTool } from 'react-icons/md';`
 */
export const IconPanTool = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPanTool } from '@aws-amplify/ui-react'; → import { MdPanTool } from 'react-icons/md';`,
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
          d="M18 23.9998H11.45C10.37 23.9998 9.31 23.5498 8.56 22.7698L1.26 15.1598L3.33 13.3298C3.95 12.7798 4.86 12.6698 5.59 13.0598L8 14.3398V4.78977C8 3.40977 9.12 2.28977 10.5 2.28977C10.67 2.28977 10.84 2.30977 11.01 2.33977C11.1 1.03977 12.18 0.00976562 13.5 0.00976562C14.36 0.00976562 15.11 0.439766 15.56 1.09977C15.85 0.979766 16.17 0.919766 16.5 0.919766C17.88 0.919766 19 2.03977 19 3.41977V3.69977C19.16 3.66977 19.33 3.64977 19.5 3.64977C20.88 3.64977 22 4.76977 22 6.14977V19.9998C22 22.2098 20.21 23.9998 18 23.9998ZM4.14 15.2798L10 21.3798C10.38 21.7698 10.9 21.9998 11.44 21.9998H18C19.1 21.9998 20 21.0998 20 19.9998V6.14977C20 5.86977 19.78 5.64977 19.5 5.64977C19.22 5.64977 19 5.86977 19 6.14977V11.9998H17V3.41977C17 3.13977 16.78 2.91977 16.5 2.91977C16.22 2.91977 16 3.13977 16 3.41977V11.9998H14V2.50977C14 2.22977 13.78 2.00977 13.5 2.00977C13.22 2.00977 13 2.22977 13 2.50977V11.9998H11V4.78977C11 4.50977 10.78 4.28977 10.5 4.28977C10.22 4.28977 10 4.51977 10 4.78977V17.6598L4.65 14.8298L4.14 15.2798V15.2798Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
