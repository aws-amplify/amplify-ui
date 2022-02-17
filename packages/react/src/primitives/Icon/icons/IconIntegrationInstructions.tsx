import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconIntegrationInstructions } from '@aws-amplify/ui-react';` → `import { MdIntegrationInstructions } from 'react-icons/md';`
 */
export const IconIntegrationInstructions = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconIntegrationInstructions');
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
          d="M11 14.1702L8.83 12.0002L11 9.83016L9.59 8.41016L6 12.0002L9.59 15.5902L11 14.1702Z"
          fill="currentColor"
        />
        <path
          d="M14.41 15.5902L18 12.0002L14.41 8.41016L13 9.83016L15.17 12.0002L13 14.1702L14.41 15.5902Z"
          fill="black"
        />
        <path
          d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C4.86 3 4.73 3.01 4.6 3.04C4.21 3.12 3.86 3.32 3.59 3.59C3.41 3.77 3.26 3.99 3.16 4.23C3.06 4.46 3 4.72 3 5V15V16V19C3 19.27 3.06 19.54 3.16 19.78C3.26 20.02 3.41 20.23 3.59 20.42C3.86 20.69 4.21 20.89 4.6 20.97C4.73 20.99 4.86 21 5 21H19C20.1 21 21 20.1 21 19V16V15V5C21 3.9 20.1 3 19 3ZM12 2.75C12.41 2.75 12.75 3.09 12.75 3.5C12.75 3.91 12.41 4.25 12 4.25C11.59 4.25 11.25 3.91 11.25 3.5C11.25 3.09 11.59 2.75 12 2.75ZM19 15V16V19H5V16V15V5H19V15Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
