import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDomainDisabled } from '@aws-amplify/ui-react';` → `import { MdDomainDisabled } from 'react-icons/md';`
 */
export const IconDomainDisabled = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDomainDisabled } from '@aws-amplify/ui-react'; → import { MdDomainDisabled } from 'react-icons/md';`,
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
          d="M1.41 1.68994L0 3.09994L2 5.09994V20.9999H17.9L20.9 23.9999L22.31 22.5899L1.41 1.68994V1.68994ZM6 18.9999H4V16.9999H6V18.9999ZM6 14.9999H4V12.9999H6V14.9999ZM4 10.9999V8.99994H6V10.9999H4ZM10 18.9999H8V16.9999H10V18.9999ZM8 14.9999V12.9999H10V14.9999H8ZM12 18.9999V16.9999H13.9L15.9 18.9999H12ZM8 4.99994H10V6.99994H9.55L12 9.44994V8.99994H20V17.4499L22 19.4499V6.99994H12V2.99994H5.55L8 5.44994V4.99994ZM16 10.9999H18V12.9999H16V10.9999Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
