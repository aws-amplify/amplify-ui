import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSpeakerNotesOff } from '@aws-amplify/ui-react';` → `import { MdSpeakerNotesOff } from 'react-icons/md';`
 */
export const IconSpeakerNotesOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSpeakerNotesOff } from '@aws-amplify/ui-react'; → import { MdSpeakerNotesOff } from 'react-icons/md';`,
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
          d="M20 3.99984V15.9998H18.66L20.57 17.9098C21.39 17.6598 22 16.8998 22 15.9998V3.99984C22 2.89984 21.1 1.99984 20 1.99984H4.66L6.66 3.99984H20ZM6 11.9998H8V13.9998H6V11.9998ZM18 8.99984H11.66L13.66 10.9998H18V8.99984ZM18 5.99984H10V7.33984L10.66 7.99984H18V5.99984ZM1.41 1.58984L0 2.99984L2.01 5.00984L2 21.9998L6 17.9998H15L20.73 23.7298L22.14 22.3198L1.41 1.58984ZM5.17 15.9998L4 17.1698V6.99984L6 8.99984V10.9998H8L13 15.9998H5.17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
