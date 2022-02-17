import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconImportExport } from '@aws-amplify/ui-react';` → `import { MdImportExport } from 'react-icons/md';`
 */
export const IconImportExport = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconImportExport');
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
          d="M9 3L5 6.99H8V14H10V6.99H13L9 3ZM16 17.01V10H14V17.01H11L15 21L19 17.01H16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
