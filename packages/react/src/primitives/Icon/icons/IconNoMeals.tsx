import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNoMeals } from '@aws-amplify/ui-react';` → `import { MdNoMeals } from 'react-icons/md';`
 */
export const IconNoMeals = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNoMeals } from '@aws-amplify/ui-react'; → import { MdNoMeals } from 'react-icons/md';`,
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
          d="M15.9999 14V6C15.9999 4.24 18.2399 2 20.9999 2V18.17L18.9999 16.17V14H15.9999ZM20.4899 23.31L10.0199 12.85C9.68994 12.94 9.35994 13 8.99994 13V22H6.99994V13C4.78994 13 2.99994 11.21 2.99994 9V5.83L0.689941 3.51L2.09994 2.1L21.8999 21.9L20.4899 23.31ZM6.16994 9L4.99994 7.83V9H6.16994ZM8.99994 2H6.99994V4.17L8.99994 6.17V2ZM12.9999 9V2H10.9999V8.17L12.8499 10.02C12.9399 9.69 12.9999 9.36 12.9999 9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
