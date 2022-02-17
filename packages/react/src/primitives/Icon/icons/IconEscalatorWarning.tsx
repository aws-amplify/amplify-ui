import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEscalatorWarning } from '@aws-amplify/ui-react';` → `import { MdEscalatorWarning } from 'react-icons/md';`
 */
export const IconEscalatorWarning = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconEscalatorWarning');
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
          d="M6.5 2C7.6 2 8.5 2.9 8.5 4C8.5 5.1 7.6 6 6.5 6C5.4 6 4.5 5.1 4.5 4C4.5 2.9 5.4 2 6.5 2ZM15.5 9.5C15.5 10.33 16.17 11 17 11C17.83 11 18.5 10.33 18.5 9.5C18.5 8.67 17.83 8 17 8C16.17 8 15.5 8.67 15.5 9.5ZM18.5 12H15.66C15.08 12.01 14.52 12.32 14.21 12.86L13.29 14.18L9.72 8C9.35 7.37 8.69 7.01 8.01 7H5C3.9 7 3 7.9 3 9V15H4.5V22H9.5V11.61L12.03 16H14.23L15 14.9V22H19V17H20V13.5C20 12.68 19.33 12 18.5 12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
