import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLocalFireDepartment } from '@aws-amplify/ui-react';` → `import { MdLocalFireDepartment } from 'react-icons/md';`
 */
export const IconLocalFireDepartment = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLocalFireDepartment } from '@aws-amplify/ui-react'; → import { MdLocalFireDepartment } from 'react-icons/md';`,
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
          d="M19.48 12.3501C17.91 8.27014 12.32 8.05014 13.67 2.12014C13.77 1.68014 13.3 1.34014 12.92 1.57014C9.29 3.71014 6.68 8.00014 8.87 13.6201C9.05 14.0801 8.51 14.5101 8.12 14.2101C6.31 12.8401 6.12 10.8701 6.28 9.46014C6.34 8.94014 5.66 8.69014 5.37 9.12014C4.69 10.1601 4 11.8401 4 14.3701C4.38 19.9701 9.11 21.6901 10.81 21.9101C13.24 22.2201 15.87 21.7701 17.76 20.0401C19.84 18.1101 20.6 15.0301 19.48 12.3501ZM10.2 17.3801C11.64 17.0301 12.38 15.9901 12.58 15.0701C12.91 13.6401 11.62 12.2401 12.49 9.98014C12.82 11.8501 15.76 13.0201 15.76 15.0601C15.84 17.5901 13.1 19.7601 10.2 17.3801Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
