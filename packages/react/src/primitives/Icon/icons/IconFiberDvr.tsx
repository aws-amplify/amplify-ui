import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFiberDvr } from '@aws-amplify/ui-react';` → `import { MdFiberDvr } from 'react-icons/md';`
 */
export const IconFiberDvr = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFiberDvr');
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
          d="M11.87 12.43L10.87 9H9.37L11.12 15H12.62L14.37 9H12.87L11.87 12.43ZM21 11.5V10.5C21 9.65 20.35 9 19.5 9H16V15H17.5V13H18.65L19.5 15H21L20.1 12.9C20.6 12.65 21 12.1 21 11.5ZM19.5 11.5H17.5V10.5H19.5V11.5ZM6.5 9H3V15H6.5C7.35 15 8 14.35 8 13.5V10.5C8 9.65 7.35 9 6.5 9ZM6.5 13.5H4.5V10.5H6.5V13.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
